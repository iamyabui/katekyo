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

  const handleMessageSend = async() => {
    // 先生と生徒両方に対して連絡先リストに追加
    const contactsStudentCollectionRef = doc(db, "StudentUsers", student.id, "contacts", teacher.id);
    const contactsTeacherCollectionRef = doc(db, "TeacherUsers", teacher.id, "contacts", student.id);

    setDoc(contactsStudentCollectionRef, {
      email: teacher.email,
    });

    setDoc(contactsTeacherCollectionRef, {
      email: student.email,
    });

    // Chatsコレクション内sender_userとreceive_userに、生徒と先生が既に登録されていないかを確認する。
    // （既にあるのに、新しいドキュメントが作成するのを防ぐため）
    const ChatsRef = await collection(db, "Chats")
    const registrationCheck = await getDocs(ChatsRef).then(snapshot => {
      const resultArray = snapshot.docs.map((chat) => {
        const contact1 = chat.data().sender_user;
        const contact2 = chat.data().receive_user;

        if((contact1 == student.id && contact2 == teacher.id) || (contact1 == teacher.id && contact2 == student.id)) {
          return true;
        }
      })

      // もし既に登録されている場合は、trueを返し、登録されていない場合はundefinedが返される。
      const result = resultArray.find(value => {return value == true})
      return result;
    })

    // 登録有無のチェックの結果、登録されていない場合は、新しいドキュメントが作成されてsender_userとreceive_userが登録される。
    await registrationCheck !== true && (
      addDoc(collection(db, "Chats"), {
      sender_user: student.id, 
      receive_user: teacher.id,
    })
    )

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
