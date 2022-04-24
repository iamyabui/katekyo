import ChatNameList from "../components/student/chat/chatList/ChatNameList";
import Header from "../components/common/header/header";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import { studentUserState } from "../components/common/StudentAtoms";
import { useRecoilValue } from "recoil";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../src/firabase";
import Router from "next/router";

export default function StudentChatRoom() {
  const student = useRecoilValue(studentUserState);
  const [contactList, setContactList] = useState([]);
  const [chatsList, setChatsList] = useState([]);
  const [latestMessageWithStudentInfo, setLatestMessageWithStudentInfo] = useState([]);

  // ①該当ログインユーザーIDのcontactサブコレクションを一旦取得
  useEffect(() => {
    const studentRef = doc(db, "StudentUsers", student.id);
    const contactsRef = getDocs(collection(studentRef, "contacts"));

    contactsRef.then(snapshot => {
        const contacts = snapshot.docs.map((doc) => {
            const teacherId = doc.id;
            const name = doc.data().name;
            return { id: teacherId, name: name }
        })
        setContactList(contacts);
    })
  }, [])

  // ②chatコレクションの全内容を、chatIdとフィールドをオブジェクトとして一旦取得
  useEffect(() => {
    const ChatsRef = getDocs(collection(db, "Chats"));
    ChatsRef.then(snapshot => {
      const chats = snapshot.docs.map((doc) => {
        const chatId = doc.id;
        const contact1 = doc.data().sender_user;
        const contact2 = doc.data().receive_user;
        return { chatId: chatId, contact1: contact1, contact2: contact2}
      })
      setChatsList(chats);
    })
  },[contactList])

  // ③ ①と②で取得した、contactList（連絡先に登録されている生徒たち）とchatsList（チャットのすべて）を利用して、
  // 各生徒とログイン先生ユーザーの最新メッセージを取得。
  useEffect(() => {
    (async () => {

      const latestMessageWithStudentInfo = await Promise.all(contactList.map(async (teacher) => {
        const studentId = student.id;
        const teacherId = teacher.id;
        const teacherName = teacher.name;

        // １，先生の担当コースで、受講しているコースがあればステータスをtrueにしておく。
        //    受講中のものがあれば、受講中というステータスを表示したいため。
        const CoursesRef = collection(db, "Courses");
        const q = query(CoursesRef, where("teacherID", "==", teacherId));
        
        const getCoursesId = await getDocs(q).then((snapshot) => {
          const courseIdArray = [];
          snapshot.docs.forEach((doc) => {
            const id = doc.id;
            courseIdArray.push(id);
          })
          return courseIdArray;
        })

        const statusArray = await Promise.all(getCoursesId.map(async (courseId) => {
          const CourseRef = doc(db, "Courses", courseId, "students", studentId);
          const CourseInfo = await getDoc(CourseRef);
          const getStatus = CourseInfo.data();
          if(getStatus !== undefined){
            return getStatus.status;
          }
        }))

        const isStatus = statusArray.includes("受講中");
        
        // ２，先生との最新メッセージを取得する。
        // chat:既にチャットリストに登録されている生徒とログイン先生ユーザーのやりとりchatを探して取得
        const chat = chatsList.map((chat) => {
          if((chat.contact1 == studentId && chat.contact2 == teacherId) || (chat.contact1 == teacherId && chat.contact2 == studentId)) {
            return chat;
          }
        }).filter(Boolean)

        // もし一人もチャットリストとして登録されていない場合は、以下の処理をスキップする。
        if(chat.length > 0) {
        
        // 以下で最新メッセージを取得する。
          const chatId = chat[0].chatId;

        // 上で取得したChatIDからMessagesコレクションを、最新順にして配列で取得。
        const MessageRef = collection(db, "Chats", chatId, "Messages");
        const q = query(MessageRef, orderBy("time", "desc"));

        const messages = await getDocs(q).then(snapshot => {
          const messageArray = [];
          snapshot.docs.forEach((doc) => {
            const message = doc.data().text;
            const time = doc.data().time;
            messageArray.push({ message, time });
          });
          return messageArray;                    
        })

        // latestMessage:messageArrayから最新のMessageを取得。
        const latestMessage = messages[0];

        // ３，１と２で取得した値をオブジェクトとして登録（表示で利用するため）
        return({ teacherId: teacherId, teacherName: teacherName, latestMessage: latestMessage, isStatus: isStatus})
        }

      }));
      setLatestMessageWithStudentInfo(latestMessageWithStudentInfo);

    })()
  },[chatsList])

  const handleMoveToChatroom = (id) => {
    Router.push({
      pathname: "/studentChatRoom",
      query: { id: id }
    });
  }
  return (
    <>
      <Header />
      <div className="w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <StudentLeftMenu />
          <div>
          {latestMessageWithStudentInfo.map((teacher, index) => (
              <div onClick={() => handleMoveToChatroom(teacher.teacherId)} key={index} className="text-sm my-2">
              <ChatNameList teacher={teacher} />
              </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
