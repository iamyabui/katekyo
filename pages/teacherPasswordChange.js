import Header from "../components/common/header/header";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useState } from "react";

export default function TeacherPasswordChange() {
    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("")

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPassword = (e) => {
        setNewPassword(e.target.value);
    }

    const handleCheckPassword = (e) => {
        setCheckPassword(e.target.value);
    }

    const handleChangePassword = () => {
        if(newPassword !== checkPassword) {
         setError("確認用のパスワードと一致しません。新しいパスワードをもう一度確認してください。")
         setCurrentPasswordError("")
         return
        };

        setIsLoading(true);
        (async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        try {
            const credential = await EmailAuthProvider.credential(
                user.email, 
                currentPassword
                );
            user && await reauthenticateWithCredential(user, credential);
            user && await updatePassword(user, newPassword);
            setIsLoading(false)
            setSuccessMsg("パスワードが変更されました")
            setError("")
            setCurrentPassword("")
            setNewPassword("")
            setCheckPassword("")
            setCurrentPasswordError("")
        } catch (e) {
            setCurrentPasswordError("パスワードが違います。もう一度確認してください。")
            setSuccessMsg("")
            setError("")
            setIsLoading(false)
        }
        })()
    }


  return (
    <>
      <Header />
      <div className="w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <TeacherLeftMenu />
        
        <div className="w-full px-10 flex flex-col">
            <p>パスワード変更</p>
            
            {successMsg && (
            <div
            className="w-full border border-blue-300 block rounded py-2 px-4 mt-5 bg-blue-100 text-blue-400 text-sm"
            >
                {successMsg}
            </div>
            )}
            <div className="w-full bg-white px-20 py-10 mt-5 rounded-md">
                <div className="flex items-center">
                    <label className="w-[250px] text-gray-700 text-sm mb-2" htmlFor="password">
                        現在のパスワード
                    </label>
                    <div  className="w-[250px]">
                        <input
                        className="w-[250px] h-9 appearance-none border border-gray-300 block rounded py-3 px-4 mb-3 focus:outline-none"
                        id="password"
                        type="text"
                        placeholder=""
                        onChange={handleCurrentPassword}
                        value={currentPassword}
                        ></input>
                        {currentPasswordError && (
                        <p className="text-xs text-red-500">{currentPasswordError}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <label className="w-[250px] text-gray-700 text-sm mb-2" htmlFor="password">
                        新しいパスワード
                    </label>
                    <div className="w-[250px]">
                    <input
                    className="w-full h-9 appearance-none border border-gray-300 block rounded py-3 px-4 mb-3 focus:outline-none"
                    id="password"
                    type="text"
                    placeholder=""
                    onChange={handleNewPassword}
                    value={newPassword}
                    ></input>
                    {error && (
                        <p className="text-xs text-red-500">{error}</p>
                    )}
                    </div>
                </div>
                <div className="flex items-center mt-5">
                    <label className="w-[250px] text-gray-700 text-sm mb-2" htmlFor="password">
                        新しいパスワード(確認用)
                    </label>
                    <input
                    className="w-[250px] h-9 appearance-none border border-gray-300 block rounded py-3 px-4 mb-3 focus:outline-none"
                    id="password"
                    type="text"
                    placeholder=""
                    onChange={handleCheckPassword}
                    value={checkPassword}
                    ></input>
                </div>
            </div>
            
            {(!currentPassword || !newPassword || !checkPassword) || isLoading ? (
                <button 
                className="mx-auto my-10 bg-gray-200 font-semibold border border-gray-300 text-white py-2 w-40 rounded"
                >
                    変更する
                </button>
            ):(
                <button 
                className="mx-auto my-10 bg-transparent font-semibold text-origin-purple border border-origin-purple hover:bg-origin-purple hover:text-white py-2 w-40 rounded"
                onClick={() => handleChangePassword()}
                >
                    変更する
                </button>
            )}
            
        </div>
        </div>
      </div>
    </>
  );
}
