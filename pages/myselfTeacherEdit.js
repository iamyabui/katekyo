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
import { useRecoilValue } from "recoil";
import Router from "next/router";
import TitleForm from "../components/teacher/profileEdit/TitleForm"
import { teacherUserState } from "../components/common/TeacherAtoms";

export default function MyselfTeacherEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(teacherUserState);
  const userId = loginUser.id;
  const flag = loginUser.flag;
  const [userName, setUserName] = useState(loginUser.name)
  const [status, setStatus] = useState(loginUser.status)
  const [category, setCategory] = useState(loginUser.category)
  const [subjects, setSubjects] = useState(loginUser.subjects)
  const [title, setTitle] = useState(loginUser.title)
  const [detail, setDetail] = useState(loginUser.detail)
  const [consult, setConsult] = useState(loginUser.consult)

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
                <TeacherProfileEdit  userName={userName} setUserName={setUserName}/>
                <SwitchForm status={status} setStatus={setStatus}/>
              </div>

              <div className="flex-column mx-auto w-[40rem] px-8 text-gray-700">
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 font-bold">サポートカテゴリ</label>
                  <Category category={category} setCategory={setCategory} />
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="mb-2 font-bold">サポート科目</label>
                  <form></form>
                  <div>
                    <SelectSubjects selected={subjects} setSelected={setSubjects}/>
                  </div>
                </div>
                <TitleForm title={title} setTitle={setTitle} />
                <div className="mb-4 flex flex-col">
                  <label className="font-bold">自己紹介/経歴/料金</label>
                  <Markdown detail={detail} setDetail={setDetail} />
                </div>
                <div className="mb-4 flex flex-col">
                  <ConsultMethods consult={consult} setConsult={setConsult}/>
                </div>
                <div className="mb-4 flex flex-col">
                  <label className="font-bold">コースと料金</label>
                  <div>
                    <input
                      className="w-80 my-2 px-2 py-1 border border-solid border-gray-300 rounded"
                      placeholder="コース名"
                    ></input>
                    <input
                      className="w-20 my-2 ml-2 mr-1 px-2 py-1 border border-solid border-gray-300 rounded"
                      placeholder="料金"
                    ></input>
                    円
                    <button className="bg-card-purple hover:bg-origin-deepPurple px-3 py-1 ml-2 rounded">
                      追加
                    </button>
                    <div>
                      <ul>
                        <li className="py-1 flex items-center">
                          <p>チャット相談/週1ビデオ相談（30分）　3000円</p>
                          <img src="/close.png" className="h-4 w-4 ml-3" />
                        </li>
                        <li className="py-1 flex items-center">
                          <p>チャット相談/週1ビデオ講義（50分）　6000円</p>
                          <img src="/close.png" className="h-4 w-4 ml-3" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-end">
                  <Save userName={userName} status={status} category={category} subjects={subjects} title={title} detail={detail} consult={consult}/>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
