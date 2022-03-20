import { useRecoilValue } from "recoil";
import { teacherUserState } from "../../common/TeacherAtoms";
import Edit from "./EditButton";

export default function DetailBox() {
  const teacher = useRecoilValue(teacherUserState)
    return(
        <div className="mx-10 w-[40rem] text-gray-700">
        <p className="mb-5 ml-2">自己紹介</p>
        <div className="mb-5 flex-column bg-white p-8 rounded ">
          <p className="whitespace-pre-wrap">{teacher.detail}</p>
        </div>
  
        <p className="mb-5 ml-2">コース内容</p>
        <div className="mb-5 flex-column bg-white p-8 rounded ">
          <p className="whitespace-pre-wrap">test</p>
        </div>
  
  
        <div className="mt-10 flex justify-end">
          <Edit />
        </div>
        </div>
        
    );
}