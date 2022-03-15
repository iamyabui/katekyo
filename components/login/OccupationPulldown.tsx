import { useRecoilState, useRecoilValue } from "recoil";
import { userState, errorState } from "../common/atoms";

export default function OccupationPulldown() {
  const [user, setUser] = useRecoilState(userState);
  const error = useRecoilValue(errorState);

  const handleOccupation = (e) => {
    setUser({ ...user, occupation: e.target.value });
  };

  return (
    <div className="inline-block mb-5">
      <label className="block text-gray-700 mb-2">大学生/大学院/社会人 ※</label>
      <div className="relative w-32">
        <select
          onChange={handleOccupation}
          defaultValue={user.occupation}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">選択</option>
          <option value="college">大学生</option>
          <option value="master">大学院生</option>
          <option value="society">社会人</option>
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
      {error.occupationError !== "" && (
        <p className="text-red-500 text-xs pl-2 mt-3 mb-3">
          {error.occupationError}
        </p>
      )}
    </div>
  );
}
