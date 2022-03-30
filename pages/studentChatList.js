import ChatNameList from "../components/student/chat/chatList/ChatNameList";
import Header from "../components/common/header/header";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import { studentUserState } from "../components/common/StudentAtoms";
import { useRecoilValue } from "recoil";
import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../src/firabase";
import Router from "next/router";

export default function StudentChatRoom() {
  const student = useRecoilValue(studentUserState);
  const [contactList, setContactList] = useState([]);

  // 該当ログイン生徒ユーザーIDのcontactサブコレクションを取得
  useEffect(() => {
    const studentRef = doc(db, "StudentUsers", student.id);
    const contactsRef = getDocs(collection(studentRef, "contacts"));

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
      pathname: "/studentChatRoom",
      query: { id: id }
    });
  }
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="flex max-w-5xl mx-auto py-10 h-screen">
          <StudentLeftMenu />
          <div className="mx-auto">
          {contactList.map((teacher, index) => (
              <div onClick={() => handleMoveToChatroom(teacher.id)} key={index}>
              <ChatNameList teacher={teacher}/>
              </div>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
