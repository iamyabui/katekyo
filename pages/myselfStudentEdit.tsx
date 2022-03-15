import Header from "../components/common/header/header";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import Save from "../components/common/buttons/SaveButton";
import { useRecoilState, useRecoilValue } from "recoil";
import { editUserState, userState } from "../components/common/atoms";
import StudentProfileEditCard from "../components/student/profileEdit/StudentProfileEditCard";
import { useEffect, useState } from "react";
import Router from "next/router";

export default function TopTeacherDetail() {
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(userState);
  const userId = loginUser.id;

  useEffect(() => {
    // ログインユーザを確認し、ログインできてなかったらLoginページへ遷移する。
    userId == "" && Router.push("/login");
    setIsLoading(false);
  }, []);

  const handleText = (e) => {
    setEditUser({ ...editUser, text: e.target.value });
  };

  const handleGoal = (e) => {
    setEditUser({ ...editUser, goal: e.target.value });
  };

  const handleRequest = (e) => {
    setEditUser({ ...editUser, request: e.target.value });
  };

  return (
    <>
      {(isLoading || userId) && (
        <>
          <Header />
          <div className="bg-top-bg h-screen w-screen">
            <div className="flex max-w-5xl mx-auto py-10">
              <StudentLeftMenu />
              <StudentProfileEditCard />
              <div className="flex-column min-w-[28rem] mx-10 text-gray-700">
                <div className="mb-5">
                  <label>自己紹介</label>
                  <textarea
                    className="form-control
            block
            w-full
            h-[130px]
            my-3
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            "
                    value={editUser.text}
                    onChange={handleText}
                  ></textarea>
                </div>
                <div>
                  <label>目標</label>
                  <textarea
                    className="form-control
            block
            w-full
            my-3
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            "
                    value={editUser.goal}
                    onChange={handleGoal}
                  ></textarea>
                </div>
                <div>
                  <label>先生へのリクエスト</label>
                  <textarea
                    className="form-control
            block
            w-full
            my-3
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            "
                    value={editUser.request}
                    onChange={handleRequest}
                  ></textarea>
                </div>
                <div className="mt-5 flex justify-end">
                  <Save />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      ;
    </>
  );
}
