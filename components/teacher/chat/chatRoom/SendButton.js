import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../../../src/firabase";
import { teacherUserState } from "../../../common/TeacherAtoms";

export default function Send(props) {
  const teacher = useRecoilValue(teacherUserState);
  const { message, file, chatId, setMessages, setNewMessage } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    const MessageRef = collection(db, "Chats", chatId, "Messages");

    if (file) {
      // (async() => {
        const storage = getStorage();
        const storageRef = ref(storage, `chat/${chatId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(`state_changed`,
        (snapshot) => {
          switch (snapshot.state) {
            case `running` :
              setIsLoading(true);
          }
        },
        (error) => alert(error.message),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDoc(doc(MessageRef), {
              photo_url: teacher.photo_url,
              sender_id: teacher.id,
              sender_name: teacher.name,
              text: message,
              time: serverTimestamp(),
              file_url: url,
            })
          })
        })
      // })()
    }
    
    if (!file) {
    setDoc(doc(MessageRef), {
      photo_url: teacher.photo_url,
      sender_id: teacher.id,
      sender_name: teacher.name,
      text: message,
      time: serverTimestamp(),
      file_url: "",
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
      const file_url = doc.data().file_url;
      return { id: id, text: text, time: time, sender_name: sender_name, file_url: file_url }
      })
      setMessages(getMessages);
      setNewMessage("");
    })
    }
  }

  return (  
    <>
    { (message || file) ? (
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
