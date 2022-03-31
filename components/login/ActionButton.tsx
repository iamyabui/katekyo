import NameForm from "../login/NameForm";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { db, auth } from "../../src/firabase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { userState, errorState } from "../common/atoms";
import { teacherUserState } from "../common/TeacherAtoms";
import Router from "next/router";
import { Dispatch, SetStateAction } from "react";
import SchoolNameForm from "../student/profileEdit/SchoolNameForm";
import GradePulldown from "../student/profileEdit/GradePulldown";
import OccupationPulldown from "./OccupationPulldown";
import OccupationNameForm from "./OccupationNameForm";
import { studentUserState } from "../common/StudentAtoms";

type loginPageType = {
  loginPage: boolean;
  setLoginPage: Dispatch<SetStateAction<boolean>>;
};

export default function Action(props: loginPageType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userState);
  const setUser = useRecoilState(userState);

  const [student, setStudent] = useRecoilState(studentUserState);
  const [teacher, setTeacher] = useRecoilState(teacherUserState);

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
          const id = userCredential.user.uid;

          const studentRef = doc(db, "StudentUsers", id);
          const teacherRef = doc(db, "TeacherUsers", id);

        getDoc(studentRef).then((snapshot) => {
          if (snapshot.data()) {
            const user = snapshot.data();
            setStudent({
              ...student,
              id: snapshot.id,
              email: user.email,
              flag: "student",
              name: user.name,
              school: user.school,
              grade: user.grade,
              text: user.text,
              goal: user.goal,
              request: user.request,
              photo_url: user.photo_url,
            });
          }
        });

        getDoc(teacherRef).then((snapshot) => {
          if (snapshot.data()) {
            const user = snapshot.data();
            console.log(user)
            setTeacher({
              ...teacher,
              id: snapshot.id,
              email: user.email,
              flag: "teacher",
              name: user.name,
              status: user.status,
              photo_url: user.photo_url,
              occupation: user.occupation,
              occupationName: user.occupationName,
              category: user.category,
              subjects: user.subjects,
              title: user.title,
              detail: user.detail,
              consult: user.consult,
            });
          }
        });

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

  // 新規登録（モーダル出力前）：
  // 1,メールアドレスとパスワードのバリデーション
  // 2,問題なし＆生徒の場合：生徒用モーダル出力　問題なし＆先生の場合：先生用モーダル出力
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
  async function handleCreateUser() {
    console.log(user);
    // 生徒としてユーザ登録した場合
    if (user.flag == "student") {
      // ユーザが登録成功した場合
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
              flag: "student",
              name: user.name,
              school: user.school,
              grade: user.grade,
              text: "",
              goal: "",
              request: "",
              photo_url: "",
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
    //  先生としてユーザ登録した場合
    } else {
      // ユーザが登録成功した場合
      if (user.name !== "" && user.occupation !== "") {
        try {
          await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
          ).then((userCredential) => {
            const userId = userCredential.user.uid;
            setDoc(doc(db, "TeacherUsers", userId), {
              email: user.email,
              name: user.name,
              flag: "teacher",
              status: false,
              photo_url: "",
              occupation: user.occupation,
              occupationName: user.occupationName,
              category: "",
              subjects: [],
              title: "",
              detail: "",
              consult: { video: false, chat: false }, 
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
      } else if (user.name !== "" && user.occupation == "") {
        setError({
          ...error,
          occupationError: "職業を選択してください。",
          nameError: "",
        });
      } else if (user.name == "" && user.occupation !== "") {
        setError({
          ...error,
          nameError: "名前を入力してください。",
          occupationError: "",
        });
      } else {
        setError({
          ...error,
          nameError: "名前を入力してください。",
          occupationError: "職業を選択してください。",
        });
      }
    }
  }

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
                {user.flag == "student"
                  ? "生徒さん、ようこそ！"
                  : "先生の登録ありがとうございます！"}
              </p>
              <ModalCloseButton onClick={handleResetError} />
              <div className="mx-auto">
                {user.flag == "student" ? (
                  <>
                    <NameForm />
                    <SchoolNameForm />
                    <GradePulldown />
                  </>
                ) : (
                  <>
                    <NameForm />
                    <OccupationPulldown />
                    <OccupationNameForm />
                  </>
                )}
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
