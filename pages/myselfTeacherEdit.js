import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import TeacherProfileEdit from "../components/teacher/profileEdit/TeacherProfileEditCard";
import Category from "../components/common/pulldown/CategoryPulldown";
import Save from "../components/teacher/profileEdit/SaveButton";
import ConsultMethods from "../components/common/checkbox/ConsultMethodCheckbox";
import SelectSubjects from "../components/common/selectButtons/SubjectSelectButtons";
import Header from "../components/common/header/header";
import Markdown from "../components/common/markdown";
import SwitchForm from "../components/teacher/profileEdit/SwitchForm";
import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Router from "next/router";
import TitleForm from "../components/teacher/profileEdit/TitleForm"
import CourseEditForm from "../components/teacher/profileEdit/CourseEditForm"
import { teacherUserState } from "../components/common/TeacherAtoms";
import { editUserState } from "../components/common/atoms";

export default function MyselfTeacherEdit() {
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(teacherUserState);
  const userId = loginUser.id;
  const flag = loginUser.flag;

  useEffect(() => {
    // ログインユーザを確認し、ログインできてなかったらLoginページへ遷移する。
    userId == "" && Router.push("/login");
    flag !== "teacher" && Router.push("/");
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <>
    {console.log(loginUser)}
      {(isLoading || userId || flag == "teacher") && (
        <>
          <Header />
          <div className="bg-top-bg w-screen">
            <div className="flex max-w-7xl mx-auto py-10">
              <TeacherLeftMenu />
              <div>
                <TeacherProfileEdit />
                <SwitchForm />
              </div>

              <div className="flex-column mx-auto w-[40rem] px-8 text-gray-700">
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 font-bold">サポートカテゴリ</label>
                  <Category />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 font-bold">サポート科目</label>
                  <form></form>
                  <div>
                    <SelectSubjects />
                  </div>
                </div>
                <TitleForm />
                <div className="mb-4 flex flex-col">
                  <label className="font-bold">自己紹介/経歴/料金</label>
                  <Markdown />
                </div>
                <div className="mb-4 flex flex-col">
                  <ConsultMethods />
                </div>
                <div className="mb-4 flex flex-col">
                  <CourseEditForm />
                </div>
                <div className="mt-10 flex justify-end">
                  <Save />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
