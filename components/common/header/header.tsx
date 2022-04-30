import Router from "next/router";
import { useRecoilValue } from "recoil";
import { studentUserState } from "../StudentAtoms";
import { teacherUserState } from "../TeacherAtoms";
import BurgerMenu from "./burgerMenu";

export default function Header() {
  const teacher = useRecoilValue(teacherUserState);
  const student = useRecoilValue(studentUserState);

  return (
    <nav className="max-w-6xl m-auto py-5 px-9 flex justify-between flex-wrap bg-blue text-gray-800">
      <div className="flex">
        <div className="flex items-center">
          <p className="text-origin-purple text-2xl pr-9">KATEKYO</p>
        </div>
        <div className="flex items-center">
          <p 
          className="text-origin-purple text-base hover:cursor-pointer"
          onClick={() => Router.push("/")}
          >
            先生を探す
          </p>
        </div>
        { teacher.id && (
        <div className="flex items-center">
          <p 
          className="ml-5 text-origin-purple text-base hover:cursor-pointer"
          onClick={() => Router.push("/teacherChatList")}
          >
            チャットルーム
          </p>
        </div>
        )}
        { student.id && (
        <div className="flex items-center">
          <p 
          className="ml-5 text-origin-purple text-base hover:cursor-pointer"
          onClick={() => Router.push("/studentChatList")}
          >
            チャットルーム
          </p>
        </div>
        )}
      </div>

      <div className="flex items-center">
        <BurgerMenu />
      </div>
    </nav>
  );
}
