import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { userState, editUserState } from "../atoms";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";
import Router from "next/router";

export default function Save() {
  const [user, setUser] = useRecoilState(userState);
  const editUser = useRecoilValue(editUserState);

  async function handleSave() {
    await setUser(editUser);
    try {
      await updateDoc(doc(db, "StudentUsers", user.id), {
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
