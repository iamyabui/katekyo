import { useRecoilState } from "recoil";
import { userState } from "../common/atoms";

export default function FlagPulldown() {
  const [user, setUser] = useRecoilState(userState);

  const handleFlag = (e) => {
    setUser({ ...user, flag: e.target.value });
  };

  return (
    <div className="inline-block mb-5">
      <label className="block text-gray-700 mb-2">
        生徒、講師どちらで登録しますか？
      </label>
      <div className="relative w-32">
        <select
          onChange={handleFlag}
          defaultValue={user.flag}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="student">生徒</option>
          <option value="teacher">先生</option>
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
    </div>
  );
}
