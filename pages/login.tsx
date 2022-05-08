import Header from "../components/common/header/header";
import Email from "../components/login/EmailForm";
import Password from "../components/login/PasswordForm";
import Action from "../components/login/ActionButton";
import FlagPulldown from "../components/login/FlagPulldown";
import { useRecoilState } from "recoil";
import { userState, errorState } from "../components/common/atoms";
import { useState } from "react";
import Router from "next/router";

export default function Login() {
  // ログインページ及び新規登録画面かを判別
  const [loginPage, setLoginPage] = useState<boolean>(true);
  const [user, setUser] = useRecoilState(userState);
  const [error, setError] = useRecoilState(errorState);

  // ログインと新規登録ページへ切り替え、切替時にエラーメッセージとフォーム入力値を初期化
  const handleSwitch = () => {
    loginPage ? setLoginPage(false) : setLoginPage(true);

    const user_reset = {
      email: "",
      password: "",
      flag: "",
      name: "",
      school: "",
      grade: "",
      occupation: "",
      occupationName: "",
    }

    const error_reset = {
      emailError: "",
      passwordError: "",
      nameError: "",
      gradeError: "",
      occupationError: "",
      occupationNameError: "",
      categoryError: "",
      supportError: "",
      titleError: "",
      detailError: "",
      consultError: "",
    }

    setUser(user_reset);
    setError(error_reset);
  };

  const handlePasswordReset = () => {
    Router.push("/passwordReset");
  }

  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="w-96 mx-auto">
          <div className="flex flex-col py-10 mx-14">
            {loginPage ? (
              <h1 className="mx-auto my-10">ログイン</h1>
            ) : (
              <h1 className="mx-auto my-10">新規登録</h1>
            )}
            <Email />
            <Password />

            {!loginPage && <FlagPulldown />}
            <div className="mx-auto mt-5">
              <Action loginPage={loginPage} setLoginPage={setLoginPage} />
            </div>
            <p
              onClick={handleSwitch}
              className="underline mx-auto mt-5 hover:cursor-pointer text-sm"
            >
              {loginPage ? "新規登録はこちら" : "ログインはこちら"}
            </p>
            <p
              onClick={handlePasswordReset}
              className="underline mx-auto mt-5 hover:cursor-pointer text-sm"
            >{loginPage && "パスワードをお忘れの方はこちら" }</p>
          </div>
        </div>
      </div>
    </>
  );
}
