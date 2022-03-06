import Header from "../components/common/header/header";
import Email from "../components/login/EmailForm";
import Password from "../components/login/PasswordForm";
import Action from "../components/login/ActionButton";

export default function Login() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="w-96 mx-auto">
          <div className="flex flex-col py-10 mx-14">
            <h1 className="mx-auto my-10">ログイン</h1>
            <Email />
            <Password />

            <div className="mx-auto mt-5">
              <Action />
            </div>
            <p className="underline mx-auto mt-5 hover:cursor-pointer">
              新規登録はこちら
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
