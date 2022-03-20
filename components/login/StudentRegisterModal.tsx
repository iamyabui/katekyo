import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import NameForm from "../common/form/NameForm";
import SchoolNameForm from "../student/profileEdit/SchoolNameForm";
import GradePulldown from "../student/profileEdit/GradePulldown";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, errorState } from "../common/atoms";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../../src/firabase";
import Router from "next/router";

export default function StudentRegisterModal(props) {
  const { isOpen, onClose } = props;
  const user = useRecoilValue(userState);
  const [error, setError] = useRecoilState(errorState);

  // 新規登録：モーダルのcloseボタンを押した際に、errorをリセットする。
  const handleResetError = () => {
    setError({
      ...error,
      nameError: "",
      gradeError: "",
    });
  };

  // 新規登録：名前と学年が空欄でないことを確認後、新規ユーザーのパスワードとemailをAuthenticationに登録
  async function handleCreateUser() {
    // ユーザが登録成功した場合、モーダルをクローズしてログイン画面へ遷移する。また、ユーザ情報のStateを初期化する。
    if (user.name !== "" && user.grade !== "") {
      try {
        await createUserWithEmailAndPassword(
          auth,
          user.email,
          user.password
        ).then((userCredential) => {
          const userId = userCredential.user.uid;
          setDoc(doc(db, "StudentUsers", userId), {
            email: user.email,
            name: user.name,
            school: user.school,
            grade: user.grade,
          });
        });
        await onClose();
        await Router.push("/");
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          setError({
            ...error,
            emailError: "既に登録されているメールアドレスです。",
          });
          onClose();
        }
      }
    } else if (user.name !== "" && user.grade == "") {
      setError({
        ...error,
        gradeError: "学年を選択してください。",
        nameError: "",
      });
    } else if (user.name == "" && user.grade !== "") {
      setError({
        ...error,
        nameError: "名前を入力してください。",
        gradeError: "",
      });
    } else {
      setError({
        ...error,
        nameError: "名前を入力してください。",
        gradeError: "学年を選択してください。",
      });
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent className="w-{400px}">
        <p className="mx-auto text-lg text-gray-700 my-8 font-bold">
          生徒さん、ようこそ！
        </p>
        <ModalCloseButton onClick={handleResetError} />
        <div className="mx-auto">
          <NameForm />
          <SchoolNameForm />
          <GradePulldown />
        </div>

        <button
          onClick={handleCreateUser}
          className="mx-auto my-10 bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-40 rounded"
        >
          登録
        </button>
      </ModalContent>
    </Modal>
  );
}
