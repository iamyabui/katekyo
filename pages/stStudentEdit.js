import Header from "../components/common/header";
import StudentProfileEdit from "../components/cards/studentProfileEdit";
import StudentLeftMenu from "../components/common/studentLeftMenue";
import Save from "../components/buttons/save";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <StudentLeftMenu />
          <StudentProfileEdit />
          <div className="flex-column min-w-[28rem] mx-10">
            <div>
              <label>自己紹介</label>
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
            h-28"
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
