import { useRecoilState, useRecoilValue } from "recoil";
import { editUserState, errorState } from "../../common/atoms";

export default function EditGradePulldown() {
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const error = useRecoilValue(errorState);

  const handleGrade = (e) => {
    setEditUser({ ...editUser, grade: e.target.value });
  };

  return (
    <div className="inline-block w-40">
      <label className="block text-gray-700 mb-2">学年 ※</label>
      <div className="relative">
        <select
          onChange={handleGrade}
          value={editUser.grade}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">選択</option>
          <option value="小学１年生">小学１年生</option>
          <option value="小学２年生">小学２年生</option>
          <option value="小学３年生">小学３年生</option>
          <option value="小学４年生">小学４年生</option>
          <option value="小学５年生">小学５年生</option>
          <option value="小学６年生">小学６年生</option>
          <option value="中学1年生">中学１年生</option>
          <option value="中学2年生">中学２年生</option>
          <option value="中学３年生">中学３年生</option>
          <option value="高校１年生">高校１年生</option>
          <option value="高校２年生">高校２年生</option>
          <option value="高校３年生">高校３年生</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {error.gradeError !== "" && (
        <p className="text-red-500 text-xs pl-2 mt-3">{error.gradeError}</p>
      )}
    </div>
  );
}
