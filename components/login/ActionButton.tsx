import NameForm from "../common/form/NameForm";
import School from "../student/profileEdit/SchoolNameForm";
import Grade from "../student/profileEdit/GradePulldown";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { auth } from "../../src/firabase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, errorState } from "../common/atoms";
import Router from "next/router";
import { Dispatch, SetStateAction } from "react";

type loginPageType = {
  loginPage: boolean;
  setLoginPage: Dispatch<SetStateAction<boolean>>;
};

export default function Action(props: loginPageType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userState);
  const [error, setError] = useRecoilState(errorState);
  const { loginPage, setLoginPage } = props;

  //ログイン処理
  const handleLogin = () => {
    const email = user.email;
    const password = user.password;
    // バリデーションを実施
    if (email.match(/.+@.+\..+/) && password.length >= 6) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          Router.push("/");
          setError({
            ...error,
            emailError: "",
            passwordError: "",
          });
        })
        .catch((error) => {
          console.log(error.message);
          setError({
            ...error,
            emailError:
              "ログインに失敗しました。メールアドレス及びパスワードを確認してください。",
            passwordError: "",
          });
        });
    } else if (!email.match(/.+@.+\..+/) && password.length >= 6) {
      setError({
        ...error,
        emailError: "メールアドレスを確認してください。",
        passwordError: "",
      });
    } else if (email.match(/.+@.+\..+/) && password.length < 6) {
      setError({
        ...error,
        emailError: "",
        passwordError: "６文字以上のパスワードを設定してください。",
      });
    } else {
      setError({
        ...error,
        emailError: "メールアドレスを確認してください。",
        passwordError: "６文字以上のパスワードを設定してください。",
      });
    }
  };

  // 新規登録：メールアドレスとパスワードのバリデーション後、問題なければモーダルを出力
  const handleValidation = () => {
    const email = user.email;
    const password = user.password;

    if (email.match(/.+@.+\..+/) && password.length >= 6) {
      setError({
        ...error,
        emailError: "",
        passwordError: "",
      });
      onOpen();
    } else if (!email.match(/.+@.+\..+/) && password.length >= 6) {
      setError({
        ...error,
        emailError: "メールアドレスを確認してください。",
        passwordError: "",
      });
    } else if (email.match(/.+@.+\..+/) && password.length < 6) {
      setError({
        ...error,
        emailError: "",
        passwordError: "６文字以上のパスワードを設定してください。",
      });
    } else {
      setError({
        ...error,
        emailError: "メールアドレスを確認してください。",
        passwordError: "６文字以上のパスワードを設定してください。",
      });
    }
  };

  // 新規登録：名前と学年が空欄でないことを確認後、新規ユーザーのパスワードとemailをAuthenticationに登録
  const handleCreateUser = () => {
    // ユーザが登録成功した場合、モーダルをクローズしてログイン画面へ遷移する。また、ユーザ情報のStateを初期化する。
    if (user.name !== "" && user.grade !== "") {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(
          () => onClose(),
          () => setLoginPage(true)
        )
        .catch((error: any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);

          if (errorCode == "auth/email-already-in-use") {
            setError({
              ...error,
              emailError: "既に登録されているメールアドレスです。",
            });
            onClose();
          }
        });
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
  };

  // 新規登録：モーダルのcloseボタンを押した際に、errorをリセットする。
  const handleResetError = () => {
    setError({
      ...error,
      nameError: "",
      gradeError: "",
    });
  };

  return (
    <>
      {loginPage ? (
        <button
          onClick={() => handleLogin()}
          className="bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-52 rounded"
        >
          ログイン
        </button>
      ) : (
        <>
          <button
            onClick={() => handleValidation()}
            className="bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-52 rounded"
          >
            新規登録
          </button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent className="w-{400px}">
              <p className="mx-auto text-lg text-gray-700 my-8 font-bold">
                生徒さん、ようこそ！
              </p>
              <ModalCloseButton onClick={handleResetError} />
              <div className="mx-auto">
                <NameForm />
                <School />
                <Grade />
              </div>

              <button
                onClick={handleCreateUser}
                className="mx-auto my-10 bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-40 rounded"
              >
                登録
              </button>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}
