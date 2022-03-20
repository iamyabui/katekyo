import { useRecoilValue, useRecoilState } from "recoil";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";
import Router from "next/router";
import { studentUserState } from "../../common/StudentAtoms";
import { editUserState } from "../../common/atoms";

export default function SaveButton() {
  const [student, setStudent] = useRecoilState(studentUserState);
  const [editUser, setEditUser] = useRecoilState(editUserState);

  async function handleSave() {
    await setStudent({ ...student, 
        name: editUser.name,
        school: editUser.school,
        grade: editUser.grade,
        text: editUser.text,
        goal: editUser.goal,
        request: editUser.request,
    });
    try {
      await updateDoc(doc(db, "StudentUsers", student.id), {
        name: editUser.name,
        school: editUser.school,
        grade: editUser.grade,
        text: editUser.text,
        goal: editUser.goal,
        request: editUser.request,
      });
      await Router.push("/myselfStudentDetail");
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
