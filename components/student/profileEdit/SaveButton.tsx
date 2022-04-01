import { useRecoilValue, useRecoilState } from "recoil";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";
import Router from "next/router";
import { studentUserState } from "../../common/StudentAtoms";
import { editUserState, errorState } from "../../common/atoms";

export default function SaveButton() {
  const [student, setStudent] = useRecoilState(studentUserState);
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const [error, setError] = useRecoilState(errorState);

  async function handleSave() {
    if(editUser.grade == "" && editUser.name == "") {
      return setError({...error, 
        nameError: "名前を入力してください。", 
        gradeError: "学年を選択してください。"
      })
    }

    if(editUser.grade == "") {
      return setError({...error, 
        nameError:"", 
        gradeError: "学年を選択してください。"
      })
    }

    if(editUser.name == "") {
      return setError({...error, 
        nameError: "名前を入力してください。",
        gradeError:""
      })
    }

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
      if(editUser.grade !== "" && editUser.name !== "") {
        setError({...error, nameError:"", gradeError:""})
      }
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
