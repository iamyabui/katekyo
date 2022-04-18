import Header from "../components/common/header/header";
import ChatMessage from "../components/student/chat/chatRoom/ChatMessageBox";
import Send from "../components/student/chat/chatRoom/SendButton";
import AttachFile from "../components/chat/chatRoom/AttachFileButton";
import Status from "../components/common/buttons/StatusButton";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../src/firabase";
import { useRecoilValue } from "recoil";
import { studentUserState } from "../components/common/StudentAtoms";
import { Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function StudentChatRoom() {
  const student = useRecoilValue(studentUserState);
  const router = useRouter();
  const teacherId = router.query.id;
  const studentId = student.id;
  const [chatId, setChatId] = useState("");
  const [teacher, setTeacher] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // 生徒情報を取得
    const teacherRef = getDoc(doc(db, "TeacherUsers", teacherId));
    teacherRef.then(snapshot => {
      if (snapshot.data()) {
        const teacher = snapshot.data();
        setTeacher(teacher);
    }})

    // すべてのチャット情報をFirebaseから取得
    const ChatsRef = getDocs(collection(db, "Chats"));
    ChatsRef.then(snapshot => {
        const chats = snapshot.docs.map((doc) => {
            const id = doc.id;
            const contact1 = doc.data().sender_user;
            const contact2 = doc.data().receive_user;
            return { id: id, sender_user: contact1, receive_user: contact2 };
        })
        
        // contact1とcontact2に、先生IDと生徒DIが該当するChatを検索して、そのChatIDを取得
        const chat = chats.map((chat) => {
          if((chat.sender_user == studentId && chat.receive_user == teacherId) || (chat.sender_user == teacherId && chat.receive_user == studentId)) {
            setChatId(chat.id);
            return chat.id;
          }
        }).filter(Boolean);

        // ChatIDからメッセージIDを全部取得
        // const MessageRef = collection(db, "Chats", chatId, "Messages");
        const ChatRef = doc(db, "Chats", chat[0]);
        const MessageRef = collection(ChatRef, "Messages");
        const q = query(MessageRef, orderBy("time", "desc"));

        // Messageを送信時間の降順にしたものを配列として出力
        getDocs(q).then(snapshot => {
          const getMessages = snapshot.docs.map((doc) => {
          const id = doc.id;
          const text = doc.data().text;
          const time = doc.data().time;
          const sender_name = doc.data().sender_name;
          return { id: id, text: text, time: time, sender_name: sender_name };
          })
          setMessages(getMessages);
        })
    })
}, [])

  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <StudentLeftMenu />
          <div >
            <div>
              <div className="flex items-center py-2 mb-5">
                <h1 className="text-lg font-bold mr-5">{teacher.name}</h1>
                <Status />
              </div>
              <Textarea h={150} onChange={(e)=>(setNewMessage(e.target.value))} value={newMessage}></Textarea>
              <div className="w-[40rem] py-2 flex justify-between mb-8">
                <AttachFile />
                <Send message={newMessage} chatId = {chatId} setMessages={setMessages} setNewMessage={setNewMessage} />
              </div>
            </div>
            {messages.map((message, index) => (
              <div key={index}>
              <ChatMessage message={message.text} senderName={message.sender_name} teacher={teacher} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
