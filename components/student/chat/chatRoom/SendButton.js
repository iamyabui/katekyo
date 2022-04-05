import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { db } from "../../../../src/firabase";
import { studentUserState } from "../../../common/StudentAtoms";

export default function Send(props) {
  const student = useRecoilValue(studentUserState);
  const { message, chatId, setMessages, setNewMessage } = props;

  const handleSendMessage = () => {
    const MessageRef = collection(db, "Chats", chatId, "Messages");
    setDoc(doc(MessageRef), {
      photo_url: student.photo_url,
      sender_id: student.id,
      sender_name: student.name,
      text: message,
      time: serverTimestamp(),
    })

    // ChatIDからメッセージIDを全部取得
    const NewMessagesRef = collection(db, "Chats", chatId, "Messages");
    const q = query(NewMessagesRef, orderBy("time", "desc"));

    // Messageを送信時間の降順にしたものを配列として出力
    getDocs(q).then(snapshot => {
      const getMessages = snapshot.docs.map((doc) => {
      const id = doc.id;
      const text = doc.data().text;
      const time = doc.data().time;
      const sender_name = doc.data().sender_name;
      return { id: id, text: text, time: time, sender_name: sender_name }
      })
      setMessages(getMessages);
      setNewMessage("");
    })
  }

  return (  
    <>
     { message !== "" ? (
        <button 
        onClick={() => handleSendMessage()}
        className="bg-origin-blue hover:bg-origin-deepBlue text-white px-4 py-1 rounded">
          送信
        </button>
      ) : (
        <button 
        className="bg-gray-300 text-white px-4 py-1 rounded">
          送信
        </button>
      )}
    </>
  );
}
