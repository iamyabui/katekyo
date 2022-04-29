import { collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRecoilValue } from "recoil";
import { db } from "../../../../src/firabase";
import { teacherUserState } from "../../../common/TeacherAtoms";

export default function Send(props) {
  const teacher = useRecoilValue(teacherUserState);
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
              photo_url: teacher.photo_url,
              sender_id: teacher.id,
              sender_name: teacher.name,
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
      photo_url: teacher.photo_url,
      sender_id: teacher.id,
      text: message,
      time: serverTimestamp(),
      file_url: "",
    })
    }

    updateMessages();
    })()
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
      document.getElementById("inputFile").value="";
    })()
  }

  return (  
    <>
    {  (progress == "100" && message) || (progress == "100" && file) ? (
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
