import { useRecoilState } from "recoil";
import { userState } from "../../common/atoms";

export default function SchoolNameForm() {
  const [user, setUser] = useRecoilState(userState);

  const handleSchool = (e) => {
    setUser({ ...user, school: e.target.value });
  };

  return (
    <form>
      <div>
        <label className="block text-gray-700 text-base mb-2" htmlFor="school">
          学校名
        </label>
        <input
          onChange={handleSchool}
          className="w-40 h-9 appearance-none block border border-gray-400 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          id="school"
          type="text"
          placeholder=""
          value={user.school}
        />
        {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
    </form>
  );
}
