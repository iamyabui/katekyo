import { useRecoilState } from "recoil";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";
import Router from "next/router";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function Save(props) {
  const [teacher, setTeacher] = useRecoilState(teacherUserState);
  const { userName, status, category, subjects, title, detail, consult } = props;

  async function handleSave() {
    try {
      await updateDoc(doc(db, "TeacherUsers", teacher.id), {
        name: userName,
        status: status,
        // photo_url: ,
        // occupation: ,
        // occupationName: "",
        category: category,
        subjects: subjects,
        title: title,
        detail: detail,
        consult: consult,
      });
      await setTeacher({...teacher,
        name: userName,
        status: status,
        // photo_url: ,
        // occupation: ,
        // occupationName: "",
        category: category,
        subjects: subjects,
        title: title,
        detail: detail,
        consult: consult,
    })
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
