import { useRecoilValue } from "recoil";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function IconSmall() {
  const teacher = useRecoilValue(teacherUserState)
  const icon_src = teacher.photo_url;
  
  return (
  <div className="my-1 w-10 h-10 rounded-full bg-red-200">
    <img id="image" src={icon_src} alt="icon" className="w-10 h-10 rounded-full object-cover"/>
  </div>
  );
}
