import Router from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { editUserState } from "../../common/atoms";
import { studentUserState } from "../../common/StudentAtoms";

export default function Edit() {
  const student = useRecoilValue(studentUserState);
  const [EditUser, setEditUser] = useRecoilState(editUserState);

  const handleGoEditPage = () => {
    console.log(student)
    setEditUser({
      ...EditUser,
      name: student.name,
      school: student.school,
      grade: student.grade,
      text: student.text,
      goal: student.goal,
      request: student.request,
      photo_url: student.photo_url,
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
