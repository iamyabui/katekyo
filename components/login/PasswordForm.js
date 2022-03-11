import { useRecoilState, useRecoilValue } from "recoil";
import { userState, errorState } from "../common/atoms";

export default function Password() {
  const [user, setUser] = useRecoilState(userState);
  const error = useRecoilValue(errorState);

  const handlePassword = (e) => {
    setUser({ ...user, password: e.target.value });
  };

  return (
    <>
      <label className="block text-gray-700 text-base mb-2" htmlFor="password">
        パスワード
      </label>
      <input
        className="w-full h-9 appearance-none border border-gray-300 block rounded py-3 px-4 mb-3 focus:outline-none"
        id="password"
        type="text"
        placeholder=""
        onChange={handlePassword}
        value={user.password}
      />
      {!error.passwordError == "" && (
        <p className="text-red-500 text-xs pl-2 mb-3">{error.passwordError}</p>
      )}
    </>
  );
}
