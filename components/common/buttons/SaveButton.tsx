import { useRecoilValue } from "recoil";
import { userState } from "../atoms";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";
import Router from "next/router";

export default function Save() {
  const user = useRecoilValue(userState);

  async function handleSave() {
    console.log(user.id);
    try {
      await updateDoc(doc(db, "StudentUsers", user.id), {
        name: user.name,
        school: user.school,
        grade: user.grade,
        text: user.text,
        goal: user.goal,
        request: user.request,
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
