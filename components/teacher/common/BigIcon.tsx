import { useRecoilValue } from "recoil";
import { teacherUserState } from "../../common/TeacherAtoms";


export default function IconBig() {
  const teacher = useRecoilValue(teacherUserState)
  const icon_src = teacher.photo_url;

  return (
  <div className="my-1 w-20 h-20 rounded-full bg-white">
    <img id="image" src={icon_src} alt="icon" className="w-20 h-20 rounded-full object-cover"/>
  </div>
  )
}
