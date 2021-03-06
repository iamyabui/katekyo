import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import TeacherProfileEdit from "../components/teacher/profileEdit/TeacherProfileEditCard";
import Save from "../components/teacher/profileEdit/SaveButton";
import ConsultMethods from "../components/common/checkbox/ConsultMethodCheckbox";
import SelectSubjects from "../components/common/selectButtons/SubjectSelectButtons";
import Header from "../components/common/header/header";
import SwitchForm from "../components/teacher/profileEdit/SwitchForm";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import Router from "next/router";
import TitleForm from "../components/teacher/profileEdit/TitleForm"
import CourseEditForm from "../components/teacher/profileEdit/CourseEditForm"
import { teacherUserState } from "../components/common/TeacherAtoms";
import TextForm from "../components/teacher/profileEdit/textForm";
import CancelButton from "../components/teacher/profileEdit/CancelButton"
import Category from "../components/teacher/profileEdit/CategoryPulldown";

export default function MyselfTeacherEdit() {
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
      {(isLoading || userId || flag == "teacher") && (
        <>
          <Header />
          <div className="bg-top-bg w-screen">
            <div className="flex max-w-6xl mx-auto py-10">
              <TeacherLeftMenu />
              <div>
                <TeacherProfileEdit userId={userId}/>
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
                  <TextForm />
                </div>
                <div className="mb-4 flex flex-col">
                  <ConsultMethods />
                </div>
                <div className="mb-4 flex flex-col">
                  <CourseEditForm />
                </div>
                <div className="mt-10 flex justify-end">
                  <CancelButton />
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
