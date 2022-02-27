import Login from "../buttons/login";
import Password from "./password";
import Email from "./email";

export default function LoginForm() {
  return (
    <div className="w-96 mx-auto">
      <div className="flex flex-col py-10 mx-14">
        <h1 className="mx-auto my-10">ログイン</h1>
        <Email />
        <Password />

        <div className="mx-auto mt-5">
          <Login />
        </div>
        <p className="underline mx-auto mt-5 hover:cursor-pointer">
          新規登録はこちら
        </p>
      </div>
    </div>
  );
}
