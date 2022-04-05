import Edit from "./EditButton";
import { useRecoilValue } from "recoil";
import { studentUserState } from "../../common/StudentAtoms";

export default function ProfileContentBox() {
  const student = useRecoilValue(studentUserState)

  return (
    <div className="mx-10 w-[40rem] text-gray-700">
      <p className="mb-5 ml-2 font-bold text-sm">自己紹介</p>
      <div className="mb-5 flex-column bg-white p-8 rounded ">
        <p className="whitespace-pre-wrap text-sm">{student.text}</p>
      </div>

      <p className="mb-5 ml-2 font-bold text-sm">目標</p>
      <div className="mb-5 flex-column bg-white p-8 rounded ">
        <p className="whitespace-pre-wrap text-sm">{student.goal}</p>
      </div>

      <p className="mb-5 ml-2 font-bold text-sm">先生へのリクエスト</p>
      <div className="mb-5 flex-column bg-white p-8 rounded ">
        <p className="whitespace-pre-wrap text-sm">{student.request}</p>
      </div>

      <div className="mt-10 flex justify-end">
        <Edit />
      </div>
    </div>
  );
}
