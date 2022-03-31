import Router from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { editUserState } from "../../common/atoms";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function Edit() {
  const teacher = useRecoilValue(teacherUserState);
  const [EditUser, setEditUser] = useRecoilState(editUserState);

  const handleGoEditPage = () => {
    setEditUser({
      name: teacher.name,
      status: teacher.status,
      // photo_url: "",
      // occupation: "",
      // occupationName: "",
      category: teacher.category,
      subjects: teacher.subjects,
      title: teacher.title,
      detail: teacher.detail,
      consult: teacher.consult,
    });
    Router.push("/myselfTeacherEdit");
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
