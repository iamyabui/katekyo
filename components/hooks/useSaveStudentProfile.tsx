import { doc, updateDoc } from "firebase/firestore";
import Router from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../src/firabase";
import { editUserState, errorState } from "../common/atoms";
import { studentUserState } from "../common/StudentAtoms";

export const useSaveStudentProfile = () => {
    const [student, setStudent] = useRecoilState(studentUserState);
    const editUser = useRecoilValue(editUserState);
    const { name, school, grade, text, goal, request } = editUser;
    const [error, setError] = useRecoilState(errorState);

    const handleSave = async () => {
        if(grade == "" && name == "") {       
        
        return setError({...error, 
            nameError: "名前を入力してください。", 
            gradeError: "学年を選択してください。"
        })
        }
    
        if(grade == "") {
        return setError({...error, 
            nameError:"", 
            gradeError: "学年を選択してください。"
        })
        }
    
        if(name == "") {
        return setError({...error, 
            nameError: "名前を入力してください。",
            gradeError:""
        })
        }
    
        setStudent({ ...student, 
            name, school, grade, text, goal, request
        });

        try {
        await updateDoc(doc(db, "StudentUsers", student.id), {
            name, school, grade, text, goal, request
        });
        await Router.push("/myselfStudentDetail");
        if(grade !== "" && name !== "") {
            setError({...error, nameError:"", gradeError:""})
        }
        } catch (error) {
        alert("編集内容が保存できませんでした。");
        }
    }

    return { handleSave };
}