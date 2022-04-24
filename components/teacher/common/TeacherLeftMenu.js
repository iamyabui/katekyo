import Router from "next/router";
import { useRecoilValue } from "recoil";
import IconBig from "../../common/icon/BigIcon";
import { teacherUserState } from "../../common/TeacherAtoms";
import NoIcon from "../../common/icon/NoIcon";

export default function TeacherLeftMenu() {
  const teacher = useRecoilValue(teacherUserState);

  return (
    <div className="min-w-[20rem] text-gray-800 flex flex-col items-center pl-10">
      {!teacher.photo_url ? (
        <NoIcon />
      ):(
        <IconBig photo_url={teacher.photo_url} />
      )}
      <p className="text-lg py-2">{teacher.name}</p>
      <ul className="mt-4">
        <li 
        onClick={() => Router.push("/myselfTeacherDetail")}
        className="list-none text-base py-2 flex items-center">
          <img src="/profile.png" className="h-4 w-4 ml-3"/>
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            プロフィール
          </p>
        </li>
        <li 
        onClick={() => Router.push("/teacherChatList")}
        className="list-none text-base py-2 flex items-center">
          <img src="/chat.png" className="h-4 w-4 ml-3"/>
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            チャットルーム
          </p>
        </li>
        <li 
        onClick={() => Router.push("/myStudents")}
        className="list-none text-base py-2 flex items-center">
          <img src="/student.png" className="h-4 w-4 ml-3"/>
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            生徒
          </p>
        </li>
        <li 
        onClick={() => Router.push("/achievement")}
        className="list-none text-base py-2 flex items-center">
          <img src="/good.png" className="h-4 w-4 ml-3"/>
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            実績
          </p>
        </li>
        <li 
        onClick={() => Router.push("/teacherPasswordChange")}
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
