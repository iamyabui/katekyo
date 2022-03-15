import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../../src/firabase";
import Router from "next/router";
import IconSmall from "../icon/SmallIcon";

export default function BurgerMenu() {
  const [menuAppear, setMenuAppear] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  const handleAppearMenu = () => {
    menuAppear ? setMenuAppear(false) : setMenuAppear(true);
  };

  async function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(
        await Router.push("/login"),
        setUser({
          ...user,
          id: "",
          email: "",
          password: "",
          flag: "",
          name: "",
          school: "",
          grade: "",
          text: "",
          goal: "",
          request: "",
          photo_url: "",
          occupation: "",
          occupationName: "",
        })
      )
      .catch((error) => {
        alert("ログアウトできませんでした。");
      });
  }

  return (
    <>
      {user.id !== "" ? (
        <div onClick={handleAppearMenu}>
          <IconSmall />
        </div>
      ) : (
        <img
          className="h-7 w-7 hover:cursor-pointer"
          src="/menu.png"
          onClick={handleAppearMenu}
        />
      )}
      {menuAppear &&
        (user.id !== "" ? (
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
                  onClick={() => Router.push("/myselfStudentDetail")}
                >
                  マイページ
                </li>
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
