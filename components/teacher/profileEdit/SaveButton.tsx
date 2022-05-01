import { useRecoilState } from "recoil";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";
import Router from "next/router";
import { teacherUserState } from "../../common/TeacherAtoms";
import { editUserState, errorState } from "../../common/atoms";

export default function Save() {
  const [teacher, setTeacher] = useRecoilState(teacherUserState);
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const [error, setError] = useRecoilState(errorState);

  async function handleSave() {
    if(editUser.name == "") {
      return setError({...error, 
        nameError: "名前を入力してください。",
      })
    }

    if(editUser.status == true) {
      if( editUser.category == "" || editUser.subjects.length == 0 || editUser.title == "" || (editUser.consult.chat==false && editUser.consult.video==false) || editUser.detail == "") {
      return alert("表示ステータスをONにする場合は、全てのフォームの入力を完了させてください。")
      }
    }

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
      if(editUser.name !== "") {
        setError({...error, nameError:""})
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
