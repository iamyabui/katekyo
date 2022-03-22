import { Modal, ModalCloseButton, ModalContent, ModalOverlay, Textarea, useDisclosure } from "@chakra-ui/react";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { studentUserState } from "../../common/StudentAtoms";

export default function Consultation(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {teacher} = props;
  const [message, setMessage] = useState("");
  const student = useRecoilValue(studentUserState);

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
    const newChatIdRef = addDoc(collection(db, "Chats"), {
      sender_user: student.id, 
      receive_user: teacher.id,
    });

    const test = async () => {
      await newChatIdRef().then(function (result) {
        return result;
      })
    }

    console.log(test)
    console.log(contactsTeacherCollectionRef);
    console.log(newChatIdRef);

    // console.log(getDoc(newChatIdRef).data())
    // addDoc(collection(db, "Chats"),{
    //   sender_user: student.id, 
    //   receive_user: teacher.id,
    // },addDoc(collection(db, "Messages"),{
    //   text: "テスト",
    // }))

    // const newChatIdRef = doc(collection(db, "Chats"));
    // const newMessageCol = collection(newChatIdRef, "Messages");
    // addDoc(newChatIdRef, collection("Message"),{
    //   text: "テスト",
    // });
    // addDoc(newChatIdRef, "Message",{
    //   text: "テスト",
    // });

  }

  return (
    <>
      <button onClick={onOpen} className="bg-origin-blue hover:bg-origin-deepBlue text-white px-2 py-1 my-3 rounded">
        相談する
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent className="w-{400px}">
        <ModalCloseButton />
          <p className="mx-auto text-lg text-gray-700 my-8 font-bold">
            先生にメッセージを送信しましょう！
          </p>
          <textarea 
            onChange={(e) => setMessage(e.target.value)}
            className="w-72 h-24 mx-auto border border-gray-300 text-gray-700 rounded py-3 px-4 mb-3"></textarea>
          <button
            onClick={handleMessageSend}
            className="mx-auto mt-5 mb-10 bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-40 rounded"
          >
            送信
          </button>
        </ModalContent>
      </Modal>
    </>
    
  );
}
