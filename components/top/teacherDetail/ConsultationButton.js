import { Modal, ModalCloseButton, ModalContent, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import Router from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { studentUserState } from "../../common/StudentAtoms";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function Consultation(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {teacher} = props;
  const [message, setMessage] = useState("");
  const student = useRecoilValue(studentUserState);
  const login_teacher = useRecoilValue(teacherUserState);

  const handleMessageSend = () => {
    // 先生と生徒両方に対して連絡先リストに追加
    const contactsStudentCollectionRef = doc(db, "StudentUsers", student.id, "contacts", teacher.id);
    const contactsTeacherCollectionRef = doc(db, "TeacherUsers", teacher.id, "contacts", student.id);

    setDoc(contactsStudentCollectionRef, {
      name: teacher.name,
    });

    setDoc(contactsTeacherCollectionRef, {
      name: student.name,
    });

    // 先生と生徒のチャットリストに両ユーザを追加。また、メッセージを追加できる。
    addDoc(collection(db, "Chats"), {
      sender_user: student.id, 
      receive_user: teacher.id,
    });

    Router.push({
      pathname: "/studentChatRoom",
      query: { id: teacher.id }
    });

  }

  return (
    <>
    {(student.id !== "" && login_teacher.id == "") && (
      <button onClick={onOpen} className="bg-origin-blue hover:bg-origin-deepBlue text-white px-2 py-1 my-3 rounded">
        相談する
      </button>
    )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent className="w-{400px}">
        <ModalCloseButton />
          <p className="w-72 mx-auto text-base font-bold text-gray-700 mt-8 mb-5">
            チャットルームで先生にメッセージを送信しましょう！
          </p>
          <button
            onClick={handleMessageSend}
            className="w-72 mx-auto mb-10 bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-40 rounded"
          >
            チャットルームに移動
          </button>
        </ModalContent>
      </Modal>
    </>
    
  );
}
