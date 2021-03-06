import Header from "../components/common/header/header";
import ChatMessage from "../components/student/chat/chatRoom/ChatMessageBox";
import Send from "../components/student/chat/chatRoom/SendButton";
import AttachFile from "../components/chat/chatRoom/AttachFileButton";
import Status from "../components/common/buttons/StatusButton";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../src/firabase";
import { useRecoilValue } from "recoil";
import { studentUserState } from "../components/common/StudentAtoms";
import { Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from '@chakra-ui/react'

export default function StudentChatRoom() {
  const student = useRecoilValue(studentUserState);
  const router = useRouter();
  const teacherId = router.query.id;
  const studentId = student.id;
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState("");
  const [teacher, setTeacher] = useState({});
  const [teacher_name, setTeacher_name] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(100);
  const [fileError, setFileError] = useState("");
  const [isStatus, setIsStatus] = useState(false);

  useEffect(() => {
    (async () => {
      // 先生の担当コースで、受講しているコースがあればステータスをtrueにしておく。
      // 受講中のものがあれば、受講中というステータスを表示したいため。
      const coursesRef = collection(db, "Courses")
      const q = query(coursesRef, where("teacherID", "==", teacherId));
      const coursesArray = [];
      await getDocs(q).then(snapshot => {
        snapshot.forEach((doc) => {
          const id = doc.id;
          coursesArray.push(id);
        })
      })

      const statusArray = await Promise.all(coursesArray.map(async (course) =>{
        const StudentStatusRef = doc(db, "Courses", course, "students", studentId);
        const courseInfo = await getDoc(StudentStatusRef);
        const getStatus = courseInfo.data();
        if(getStatus){
          return getStatus.status;
        }
      }))
      
      const isStatus = statusArray.includes("受講中");
      setIsStatus(isStatus);

    })()
  },[])

  useEffect(() => {
    (async () => {
    // 生徒情報を取得
    if(typeof teacherId == "string"){
    const teacherRef = doc(db, "TeacherUsers", teacherId);
    
    const teacher = await getDoc(teacherRef).then(snapshot => {
        return snapshot.data();
    })
    setTeacher_name(teacher.name);
    setTeacher(teacher);

    // すべてのチャット情報をFirebaseから取得
    const ChatsRef = collection(db, "Chats");
    const chats = await getDocs(ChatsRef).then(snapshot => {
      const chatsArray = [];
      snapshot.docs.forEach((doc) => {
        const id = doc.id;
        const contact1 = doc.data().sender_user;
        const contact2 = doc.data().receive_user;
        chatsArray.push({id, contact1, contact2});
      });
      return chatsArray;
    })
    setChats(chats)
    }
    })();
  },[])
  
  useEffect(() => {
    if (chats.length > 0) {
      // contact1とcontact2に、先生IDと生徒DIが該当するChatを検索して、そのChatIDを取得
      chats.forEach((chat) => {
        if((chat.contact1 == studentId && chat.contact2 == teacherId) || (chat.contact1 == teacherId && chat.contact2 == studentId)) {
          setChatId(chat.id);
        }
      })
    }
  },[chats])
  
  useEffect(() => {
    if (chatId){ 
    (async() => {
      // ChatIDからメッセージIDを全部取得
      const MessageRef = collection(db, "Chats", chatId, "Messages");
      const q = query(MessageRef, orderBy("time", "desc"));
    
      // Messageを送信時間の降順にしたものを配列として出力
      const messages = await getDocs(q).then(snapshot => {
        const messageArray = [];
        snapshot.docs.forEach((doc) => {
        const id = doc.id;
        const { text, time, sender_id, file_url } = doc.data();
        messageArray.push({ id: id, text: text, time: time, sender_id: sender_id, file_url: file_url });
        })
        return messageArray;
      });

      setMessages(messages);
    })()
    }
  },[chatId])

  return (
    <>
      <Header />
      <div className="w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <StudentLeftMenu />
          <div >
            <div className="mb-5">
              <div className="flex items-center py-2 mb-5">
                <h1 className="text-lg font-bold mr-5">{teacher_name}</h1>
                {isStatus && (
                  <Status />
                )}
              </div>
              <Textarea h={150} onChange={(e)=>(setNewMessage(e.target.value))} value={newMessage}></Textarea>
              <div className="w-[40rem] py-2 flex justify-between">
                <AttachFile file={file} setFile={setFile} setFileError={setFileError} />
                <Send 
                message={newMessage} 
                file={file} 
                setFile={setFile} 
                chatId={chatId} 
                setChatId={setChatId} 
                setMessages={setMessages} 
                setNewMessage={setNewMessage} 
                progress={progress} 
                setProgress={setProgress}
                />
              </div>
              {fileError && (
                <p className="text-xs text-red-500">{fileError}</p>
              )}
            </div>
            {progress == 100 ? (
            messages.map((message, index) => (
              <div key={index}>
              <ChatMessage message={message.text} file_url={message.file_url} senderId={message.sender_id} teacher={teacher} teacherId={teacherId} />
              </div>
            ))
            ):(
              <div className="flex">
              <Spinner />
              <p className="ml-4">loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
