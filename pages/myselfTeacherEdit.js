import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import TeacherProfileEdit from "../components/teacher/profileEdit/TeacherProfileEditCard";
import Category from "../components/common/pulldown/CategoryPulldown";
import Save from "../components/common/buttons/SaveButton";
import ConsultMethods from "../components/common/checkbox/ConsultMethodCheckbox";
import SelectSubjects from "../components/common/selectButtons/SubjectSelectButtons";
import Header from "../components/common/header/header";
import Markdown from "../components/common/markdown";
import SwitchForm from "../components/teacher/profileEdit/SwitchForm";

export default function MyselfTeacherEdit() {
  return (
    <div>
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
            <div className="mb-4 flex flex-col">
              <label className="font-bold">表示タイトル</label>
              <input
                className="form-control
            block
            w-96
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
              ></input>
            </div>
            <div className="mb-4 flex flex-col">
              <label className="font-bold">自己紹介/経歴/料金</label>
              <Markdown />
            </div>
            <div className="mb-4 flex flex-col">
              <ConsultMethods />
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
              <Save />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
