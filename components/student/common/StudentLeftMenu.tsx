import IconBig from "../../common/icon/BigIcon";
import { useRecoilValue } from "recoil";
import Router from "next/router";
import { studentUserState } from "../../common/StudentAtoms";
import NoIcon from "../../common/icon/NoIcon";

export default function StudentLeftMenu() {
  const student = useRecoilValue(studentUserState);

  return (
    <div className="min-w-[20rem] text-gray-800 flex flex-col items-center pl-10">
      {!student.photo_url ? (
        <NoIcon />
      ):(
        <IconBig photo_url={student.photo_url} />
      )}
      
      <p className="text-lg py-2">{student.name}</p>
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
      </ul>
    </div>
  );
}
