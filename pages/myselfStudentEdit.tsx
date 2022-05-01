import Header from "../components/common/header/header";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import StudentProfileEditCard from "../components/student/profileEdit/StudentProfileEditCard";
import { useEffect, useState } from "react";
import Router from "next/router";
import { studentUserState } from "../components/common/StudentAtoms";
import { editUserState } from "../components/common/atoms";
import SaveButton from "../components/student/profileEdit/SaveButton";
import CancelButton from "../components/student/profileEdit/CancelButton";

export default function TopTeacherDetail() {
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(studentUserState);
  const userId = loginUser.id;
  const flag = loginUser.flag;

  useEffect(() => {
    // ログインユーザを確認し、ログインできてなかったらLoginページへ遷移する。
    userId == "" && Router.push("/login");
    flag !== "student" && Router.push("/");
    setIsLoading(false);
  }, [setIsLoading]);

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
          <div className="w-screen">
            <div className="flex max-w-6xl mx-auto py-10">
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
                  <CancelButton />
                  <SaveButton />
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
