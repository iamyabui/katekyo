import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import Header from "../components/common/header/header";

export default function PasswordReset() {
    const [email, setEmail] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [firebaseError, setFirebaseError] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSendPasswordChangeForm = async() => {
            try {
                await sendPasswordResetEmail(getAuth(), email)
                setFirebaseError("")
                setSuccessMsg("メールを送信しました。メールボックスをご確認ください。")
            } catch (err) {
                setFirebaseError("入力されたメールアドレスは登録されていません。");
                setSuccessMsg("")
            }
    }

  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="max-w-3xl mx-auto flex flex-col">
            <p className="mb-10 pt-10 mx-auto text-origin-purple">パスワードリセット</p>
            <div className="bg-white pt-10 pb-14 px-28 rounded-md">
                <p className="text-sm"> 
                パスワードリセットのためのURLを、ご登録のメールアドレスに送信します。<br />
                ご登録のメールアドレスを入力し、送信ボタンをクリックしてください。
                </p>
                <div className="flex items-center mt-5">
                    <label className="w-[150px] text-sm"  htmlFor="email">
                        メールアドレス
                    </label>
                    <input
                    className="w-[250px] h-9 appearance-none border border-gray-300 block rounded py-3 px-4 focus:outline-none"
                    id="email"
                    onChange={handleEmail}
                    value={email}
                    ></input>
                </div>
                {successMsg && (
                    <p className="ml-[150px] text-xs mt-3 text-green-500">{successMsg}</p>
                )}
                {firebaseError && (
                    <p className="ml-[150px] text-xs mt-3 text-red-500">{firebaseError}</p>
                )}
            </div>
            <button 
            className="mx-auto my-10 bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-40 rounded"
            onClick={() => handleSendPasswordChangeForm()}
            >
                URLを送信
            </button>
        </div>
      </div>
    </>
  );
}
