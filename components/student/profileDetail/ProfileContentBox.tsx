import Edit from "../../common/buttons/EditButton";
import { useRecoilValue } from "recoil";
import { userState } from "../../common/atoms";

export default function ProfileContentBox() {
  const user = useRecoilValue(userState);

  return (
    <div className="mx-10 w-[40rem] text-gray-700">
      <p className="mb-5 ml-2">自己紹介</p>
      <div className="mb-5 flex-column bg-white p-8 rounded ">
        <p className="whitespace-pre-wrap">{user.text}</p>
      </div>

      <p className="mb-5 ml-2">目標</p>
      <div className="mb-5 flex-column bg-white p-8 rounded ">
        <p className="whitespace-pre-wrap">{user.goal}</p>
      </div>

      <p className="mb-5 ml-2">先生へのリクエスト</p>
      <div className="mb-5 flex-column bg-white p-8 rounded ">
        <p className="whitespace-pre-wrap">{user.request}</p>
      </div>

      <div className="mt-10 flex justify-end">
        <Edit />
      </div>
    </div>
  );
}
