import { useRecoilState } from "recoil";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";
import Router from "next/router";
import { teacherUserState } from "../../common/TeacherAtoms";
import { editUserState } from "../../common/atoms";

export default function Save() {
  const [teacher, setTeacher] = useRecoilState(teacherUserState);
  const [editUser, setEditUser] = useRecoilState(editUserState);

  async function handleSave() {
    try {
      await setTeacher({...teacher,
        name: editUser.name,
        status: editUser.status,
        // photo_url: ,
        // occupation: ,
        // occupationName: "",
        category: editUser.category,
        subjects: editUser.subjects,
        title: editUser.title,
        detail: editUser.detail,
        consult: editUser.consult,
    })
      await updateDoc(doc(db, "TeacherUsers", teacher.id), {
        name: editUser.name,
        status: editUser.status,
        // photo_url: ,
        // occupation: ,
        // occupationName: "",
        category: editUser.category,
        subjects: editUser.subjects,
        title: editUser.title,
        detail: editUser.detail,
        consult: editUser.consult,
      });
      await Router.push("/myselfTeacherDetail");
    } catch (error) {
      alert("編集内容が保存できませんでした。");
    }
  }

  return (
    <>
      <button
        onClick={handleSave}
        className="bg-origin-gray hover:bg-origin-deepGray text-white px-5 py-1 rounded"
      >
        保存
      </button>
    </>
  );
}
