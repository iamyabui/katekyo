import Router from "next/router";

export default function StudentLeftMenu() {

  return (
    <div className="min-w-[20rem] text-gray-800 flex flex-col items-center pl-10">
      <ul className="mt-4">
        <li 
        onClick={() => Router.push("/myselfStudentDetail")}
        className="list-none text-base py-2 flex items-center">
          <img src="/profile.png" className="h-4 w-4 ml-3" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            プロフィール
          </p>
        </li>
        <li 
        onClick={() => Router.push("/studentChatList")}
        className="list-none text-base py-2 flex items-center">
          <img src="/chat.png" className="h-4 w-4 ml-3" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            チャットルーム
          </p>
        </li>
        <li 
        onClick={() => Router.push("/attendanceStatus")}
        className="list-none text-base py-2 flex items-center">
          <img src="/class.png" className="h-4 w-4 ml-3" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            受講状況
          </p>
        </li>
        <li 
        onClick={() => Router.push("/passwordChange")}
        className="list-none text-base py-2 flex items-center">
          <img src="/password.png" className="h-4 w-4 ml-3"/>
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            パスワード変更
          </p>
        </li>
      </ul>
    </div>
  );
}
