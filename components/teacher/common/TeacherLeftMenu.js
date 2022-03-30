import Router from "next/router";
import { useRecoilValue } from "recoil";
import IconBig from "../../common/icon/BigIcon";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function TeacherLeftMenu() {
  const teacher = useRecoilValue(teacherUserState);

  return (
    <div className="min-w-[20rem] text-gray-800 flex flex-col items-center pl-10">
      <IconBig />
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
      </ul>
    </div>
  );
}
