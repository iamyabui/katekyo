import { useRecoilState, useRecoilValue } from "recoil";
import { userState, errorState } from "../common/atoms";

export default function Email() {
  const [user, setUser] = useRecoilState(userState);
  const error = useRecoilValue(errorState);

  const handleEmail = (e) => {
    setUser({ ...user, email: e.target.value });
  };

  return (
    <>
      <label className="block text-gray-700 text-base mb-2" htmlFor="name">
        メールアドレス
      </label>
      <input
        className="w-full h-9 appearance-none border border-gray-300 block rounded py-3 px-4 mb-3 focus:outline-none"
        id="name"
        type="text"
        placeholder=""
        onChange={handleEmail}
        value={user.email}
      />
      {error.emailError && (
        <p className="text-red-500 text-xs pl-2 mb-3">{error.emailError}</p>
      )}
    </>
  );
}
