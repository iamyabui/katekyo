import IconBig from "../../common/icon/BigIcon";
import { useRecoilValue } from "recoil";
import { studentUserState } from "../../common/StudentAtoms";
import NoIcon from "../../common/icon/NoIcon";

export default function StudentProfileDetailCard() {
  const student = useRecoilValue(studentUserState)

  return (
    <div className="w-52 h-72 py-5 px-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      { student.photo_url == "" ? (
        <NoIcon />
      ):(
        <IconBig photo_url={student.photo_url} />
      )}
      
      <p className="mt-3 mb-1">{student.name}</p>
      <p className="my-1">{student.school}</p>
      <p className="my-1">{student.grade}</p>
    </div>
  );
}
