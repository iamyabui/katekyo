import Header from "../components/common/header/header";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import Save from "../components/common/buttons/SaveButton";
import { useRecoilState } from "recoil";
import { userState } from "../components/common/atoms";
import StudentProfileEditCard from "../components/student/profileEdit/StudentProfileEditCard";

export default function TopTeacherDetail() {
  const [user, setUser] = useRecoilState(userState);

  const handleText = (e) => {
    setUser({ ...user, text: e.target.value });
  };

  const handleGoal = (e) => {
    setUser({ ...user, goal: e.target.value });
  };

  const handleRequest = (e) => {
    setUser({ ...user, request: e.target.value });
  };

  return (
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
                value={user.text}
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
                value={user.goal}
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
                value={user.request}
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
  );
}
