import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRecoilValue } from "recoil";
import { db } from "../../../../src/firabase";
import { studentUserState } from "../../../common/StudentAtoms";

export default function Send(props) {
  const student = useRecoilValue(studentUserState);
  const { message, setFile, file, chatId, setMessages, setNewMessage, progress, setProgress } = props;
  

  const handleSendMessage = () => {
    (async() => {
      const MessageRef = collection(db, "Chats", chatId, "Messages");

      if (file) {
          const storage = getStorage();
          const randomCharacter = Math.random().toString(32).substring(2);
          const storageRef = ref(storage, `chat/${chatId}/${randomCharacter}/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);
  
          uploadTask.on(`state_changed`,
          (snapshot) => {
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percent);
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
              updateMessages();
            })
          })
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
      updateMessages();
    }
    )()
  }

  const updateMessages = () => {
    (async () => {
      const NewMessagesRef = collection(db, "Chats", chatId, "Messages");
      const q = query(NewMessagesRef, orderBy("time", "desc"));
      getDocs(q).then(snapshot => {
        const messagesArray = [];
        snapshot.docs.forEach((doc) => {
        const id = doc.id;
        const text = doc.data().text;
        const time = doc.data().time;
        const sender_id = doc.data().sender_id;
        const file_url = doc.data().file_url;
        messagesArray.push({ id: id, text: text, time: time, sender_id: sender_id, file_url: file_url })
        })
        setMessages(messagesArray);
      })
      setNewMessage("");
      setFile("");
      const element: HTMLInputElement = document.getElementById("inputFile") as HTMLInputElement
      element.value="";
    })()
  }


  return (  
    <>
     { (progress == "100" && message) || (progress == "100" && file)  ? (
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
