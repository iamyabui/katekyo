import Header from "../components/common/header/header";
import StudentProfileEdit from "../components/student/profileEdit/StudentProfileEditCard";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import Save from "../components/common/buttons/SaveButton";
import Markdown from "../components/common/markdown";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <StudentLeftMenu />
          <StudentProfileEdit />
          <div className="flex-column min-w-[28rem] mx-10 text-gray-700">
            <div className="mb-5">
              <label>自己紹介</label>
              <Markdown />
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
              ></textarea>
            </div>
            <div>
              <label>先生への要望</label>
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
              ></textarea>
            </div>
            <div className="mt-5 flex justify-end">
              <Save />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
