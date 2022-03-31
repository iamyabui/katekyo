import ChatNameList from "../components/teacher/chat/chatList/ChatNameList";
import Header from "../components/common/header/header";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import { useRecoilValue } from "recoil";
import { teacherUserState } from "../components/common/TeacherAtoms";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../src/firabase";
import Router from "next/router";

export default function TeacherChatRoom() {
  const teacher = useRecoilValue(teacherUserState);
  const [contactList, setContactList] = useState([]);

  // 該当ログイン先生ユーザーIDのcontactサブコレクションを取得
  useEffect(() => {
    const teacherRef = doc(db, "TeacherUsers", teacher.id);
    const contactsRef = getDocs(collection(teacherRef, "contacts"));

    contactsRef.then(snapshot => {
        const contacts = snapshot.docs.map((doc) => {
            const id = doc.id
            const name = doc.data().name;
            return { id: id, name: name }
        })
        setContactList(contacts);
    })
}, [])

  const handleMoveToChatroom = (id) => {
    Router.push({
      pathname: "/teacherChatRoom",
      query: { id: id }
    });
  }

  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <TeacherLeftMenu />
          <div className="mx-auto">
          {contactList.map((student, index) => (
              <div onClick={() => handleMoveToChatroom(student.id)} key={index}>
              <ChatNameList student={student}/>
              </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
