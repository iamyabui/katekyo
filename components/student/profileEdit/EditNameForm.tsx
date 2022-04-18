import { useRecoilState, useRecoilValue } from "recoil";
import { errorState, editUserState } from "../../common/atoms";

export default function EditNameForm() {
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const error = useRecoilValue(errorState);

  const handleName = (e) => {
    setEditUser({ ...editUser, name: e.target.value });
  };

  return (
    <form>
      <div>
        <label className="block text-gray-700 text-base mb-2" htmlFor="name">
          名前 ※
        </label>
        <input
          onChange={handleName}
          className="w-40 h-9 appearance-none block border border-gray-300 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          id="name"
          type="text"
          placeholder=""
          value={editUser.name}
        />
        {error.nameError !== "" && (
          <p className="text-red-500 text-xs pl-2 mt-3 mb-3">
            {error.nameError}
          </p>
        )}
      </div>
    </form>
  );
}
