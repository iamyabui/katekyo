import Header from "../components/common/header";
import LoginForm from "../components/form/loginForm";

export default function Login() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <LoginForm />
      </div>
    </>
  );
}
