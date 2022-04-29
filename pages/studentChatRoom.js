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
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatId, setChatId] = useState("");
  const [teacher, setTeacher] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState("");

  useEffect(() => {
    (async () => {
    // 生徒情報を取得
    const teacherRef = doc(db, "TeacherUsers", teacherId);
    
    const teacher = await getDoc(teacherRef).then(snapshot => {
        return snapshot.data();
    })
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

    })();
  },[])
  
  useEffect(() => {
    if (chats.length > 0) {
      console.log(chats)
      // contact1とcontact2に、先生IDと生徒DIが該当するChatを検索して、そのChatIDを取得
      chats.forEach((chat) => {
        if((chat.contact1 == studentId && chat.contact2 == teacherId) || (chat.contact1 == teacherId && chat.contact2 == studentId)) {
          setChatId(chat.id);
          console.log(chat.id)
        }
      })
    }
  },[chats])

  console.log(chatId)
  
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
        const text = doc.data().text;
        const time = doc.data().time;
        const sender_id = doc.data().sender_id;
        const file_url = doc.data().file_url;
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
    {console.log("test1")}
      <Header />
      <div className="w-screen text-gray-700">
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
                <AttachFile file={file} setFile={setFile} />
                <Send message={newMessage} file={file} chatId={chatId} setChatId={setChatId} setMessages={setMessages} setNewMessage={setNewMessage} />
              </div>
            </div>
            {messages.map((message, index) => (
              <div key={index}>
              <ChatMessage message={message.text} file_url={message.file_url} senderId={message.sender_id} teacher={teacher} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
