import { useRecoilState, useRecoilValue } from "recoil";
import { userState, errorState } from "../common/atoms";

export default function OccupationNameForm() {
  const [user, setUser] = useRecoilState(userState);
  //   const error = useRecoilValue(errorState);

  const handleOccupationName = (e) => {
    setUser({ ...user, occupationName: e.target.value });
  };

  return (
    <form>
      <div>
        <label className="block text-gray-700 text-base mb-2" htmlFor="name">
          職業名/大学名
        </label>
        <input
          onChange={handleOccupationName}
          className="w-40 h-9 appearance-none block border border-gray-300 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          id="name"
          type="text"
          placeholder=""
          value={user.occupationName}
        />
        {/* {error.occupationNameError !== "" && (
          <p className="text-red-500 text-xs pl-2 mt-3 mb-3">
            {error.occupationNameError}
          </p>
        )} */}
      </div>
    </form>
  );
}
