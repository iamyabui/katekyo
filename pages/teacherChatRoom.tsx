import Header from "../components/common/header/header";
import ChatMessage from "../components/teacher/chat/chatRoom/ChatMessageBox";
import Send from "../components/teacher/chat/chatRoom/SendButton";
import AttachFile from "../components/chat/chatRoom/AttachFileButton";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import Status from "../components/common/buttons/StatusButton";
import { useRouter } from "next/router";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { teacherUserState } from "../components/common/TeacherAtoms";
import { useEffect, useState } from "react";
import { db } from "../src/firabase";
import { Textarea, Spinner } from "@chakra-ui/react";

export default function TeacherChatRoom() {
  const teacher = useRecoilValue(teacherUserState);
  const router = useRouter();
  const studentId = router.query.id;
  const teacherId = teacher.id;
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState("");
  const [student, setStudent] = useState({});
  const [student_name, setStudent_name] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(100);
  const [fileError, setFileError] = useState("");
  const [isStatus, setIsStatus] = useState(false);

  useEffect(() => {
    (async () => {
      // 先生の担当コースで、受講していればステータスをtrueにしておく。
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
        if(typeof studentId == "string") {
        const StudentStatusRef = doc(db, "Courses", course, "students", studentId);
        const courseInfo = await getDoc(StudentStatusRef);
        const getStatus = courseInfo.data();
        if(getStatus){
          return getStatus.status;
        }
      }
      }))
      
      const isStatus = statusArray.includes("受講中");
      setIsStatus(isStatus);

    })()
  },[])

  useEffect(() => {
    (async() => {
      // 生徒情報を取得
      if(typeof studentId == "string"){
      const studentRef = doc(db, "StudentUsers", studentId);

      const student = await getDoc(studentRef).then(snapshot => {
        return snapshot.data();
      })
      setStudent_name(student.name);
      setStudent(student);

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
    })()
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
    <div>
      <Header />
      <div className="w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div>
            <div>
              <div className="flex items-center py-2 mb-5">
                <h1 className="text-lg font-bold mr-5">{student_name}</h1>
                {isStatus && (
                  <Status />
                )}
              </div>
              <Textarea h={150} onChange={(e)=>(setNewMessage(e.target.value))} value={newMessage}></Textarea>
              <div className="w-[40rem] py-2 flex justify-between mb-8">
                <AttachFile file={file} setFile={setFile} setFileError={setFileError} />
                <Send message={newMessage} file={file} setFile={setFile} chatId = {chatId} setMessages={setMessages} setNewMessage={setNewMessage} progress={progress} setProgress={setProgress} />
              </div>
              {fileError && (
                <p className="text-xs text-red-500">{fileError}</p>
              )}
            </div>
            {progress == 100 ? (
            messages.map((message, index) => (
              <div key={index}>
              <ChatMessage message={message.text} file_url={message.file_url} senderId={message.sender_id} student={student} studentId={studentId} />
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
    </div>
  );
}
