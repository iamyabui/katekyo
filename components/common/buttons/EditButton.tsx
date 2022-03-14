import Router from "next/router";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { editUserState, userState } from "../atoms";

export default function Edit() {
  const user = useRecoilValue(userState);
  const setEditUser = useSetRecoilState(editUserState);
  const EditUser = useRecoilValue(editUserState);

  const handleGoEditPage = () => {
    setEditUser({
      ...EditUser,
      id: user.id,
      email: user.email,
      password: user.password,
      flag: user.flag,
      name: user.name,
      school: user.school,
      grade: user.grade,
      text: user.text,
      goal: user.goal,
      request: user.request,
      photo_url: user.photo_url,
    });
    Router.push("/myselfStudentEdit");
  };

  return (
    <>
      <button
        onClick={handleGoEditPage}
        className="bg-origin-gray hover:bg-origin-deepGray text-white px-5 py-1 rounded"
      >
        編集
      </button>
    </>
  );
}
