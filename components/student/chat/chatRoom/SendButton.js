import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../../../src/firabase";
import { studentUserState } from "../../../common/StudentAtoms";

export default function Send(props) {
  const student = useRecoilValue(studentUserState);
  const { message, file, chatId, setChatId, setMessages, setNewMessage } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    (async() => {
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
                photo_url: student.photo_url,
                sender_id: student.id,
                text: message,
                time: serverTimestamp(),
                file_url: url,
              })
            })
          })
        // })()
      }
      
      
      if (!file) {
      await setDoc(doc(MessageRef), {
        photo_url: student.photo_url,
        sender_id: student.id,
        text: message,
        time: serverTimestamp(),
        file_url: "",
      })
      }

      // ChatIDからメッセージIDを全部取得, Messageを送信時間の降順にしたものを配列として出力
      const NewMessagesRef = collection(db, "Chats", chatId, "Messages");
      const q = query(NewMessagesRef, orderBy("time", "desc"));
      const messages = await getDocs(q).then(snapshot => {
        const messagesArray = [];
        snapshot.docs.forEach((doc) => {
        const id = doc.id;
        const text = doc.data().text;
        const time = doc.data().time;
        const sender_id = doc.data().sender_id;
        const file_url = doc.data().file_url;
        messagesArray.push({ id: id, text: text, time: time, sender_id: sender_id, file_url: file_url })
        })
        return messagesArray;
      })

      setMessages(messages);
      setNewMessage("");
    }
    
    )()
  }

  return (  
    <>
    {console.log("test2")}
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
