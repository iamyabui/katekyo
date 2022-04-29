import { useState } from "react";
import { useRecoilState } from "recoil";
import { getAuth, signOut } from "firebase/auth";
import Router from "next/router";
import IconSmall from "../icon/SmallIcon";
import { teacherUserState } from "../TeacherAtoms";
import { studentUserState } from "../StudentAtoms";
import NoIconSmall from "../icon/NoIconSmall"

export default function BurgerMenu() {
  const [menuAppear, setMenuAppear] = useState(false);
  const [teacher, setTeacher] = useRecoilState(teacherUserState)
  const [student, setStudent] = useRecoilState(studentUserState)

  const handleAppearMenu = () => {
    menuAppear ? setMenuAppear(false) : setMenuAppear(true);
  };

  async function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(
        await Router.push("/login"),
        setTeacher({
          id: "",
          email: "",
          flag: "",
          name: "",
          status: false,
          photo_url: "",
          occupation: "",
          occupationName: "",
          category: "",
          subjects: [],
          title: "",
          detail: "",
          consult: { video: false, chat: false },
      }),
      setStudent({
        id: "",
        email: "",
        flag: "",
        name: "",
        school: "",
        grade: "",
        text: "",
        goal: "",
        request: "",
        photo_url: "",
      }),
      )
      .catch((error) => {
        alert("ログアウトできませんでした。");
      });
  }

  return (
    <>
      {teacher.id !== "" || student.id !== "" ? (
        <div onClick={handleAppearMenu}>
          {teacher.id && (
            !teacher.photo_url ? (
              <NoIconSmall />
            ):(
              <IconSmall photo_url={teacher.photo_url} />
            )
          )}
          {student.id && (
            !student.photo_url ? (
              <NoIconSmall />
            ):(
              <IconSmall photo_url={student.photo_url} />
            )
          )}
        </div>
      ) : (
        <img
          className="h-7 w-7 hover:cursor-pointer"
          src="/menu.png"
          onClick={handleAppearMenu}
        />
      )}
      {menuAppear &&
        (teacher.id !== "" || student.id !== "" ? (
          <div className="absolute top-16">
            <nav className="relative -left-[8em] text-gray-700 bg-white w-[10rem] border border-gray-400 rounded-md">
              <ul className="ml-4 my-5">
                <li
                  className="my-5 hover:text-origin-purple hover:cursor-pointer"
                  onClick={() => Router.push("/")}
                >
                  HOME
                </li>
                {student.id !== "" ? (
                  <li
                    className="my-5 hover:text-origin-purple hover:cursor-pointer"
                    onClick={() => Router.push("/myselfStudentDetail")}
                  >
                    マイページ
                  </li>
                ) : (
                  <li
                    className="my-5 hover:text-origin-purple hover:cursor-pointer"
                    onClick={() => Router.push("/myselfTeacherDetail")}
                  >
                    マイページ
                  </li>
                )}
                <li
                  className="my-5 hover:text-origin-purple hover:cursor-pointer"
                  onClick={handleLogout}
                >
                  ログアウト
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <div className="absolute top-16">
            <nav className="relative -left-[8em] text-gray-700 bg-white w-[10rem] border border-gray-400 rounded-md">
              <ul className="ml-4 my-5">
                <li
                  className="my-5 hover:text-origin-purple hover:cursor-pointer"
                  onClick={() => Router.push("/")}
                >
                  HOME
                </li>
                <li
                  className="my-5 hover:text-origin-purple hover:cursor-pointer"
                  onClick={() => Router.push("/login")}
                >
                  ログイン
                </li>
              </ul>
            </nav>
          </div>
        ))}
    </>
  );
}
