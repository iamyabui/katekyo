import IconBig from "../../common/icon/BigIcon";
import { useRecoilValue } from "recoil";
import { studentUserState } from "../../common/StudentAtoms";

export default function MyStudentProfileDetailCard(props) {
  const { student } = props;

  return (
    <div className="w-52 h-72 py-5 px-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <p className="mt-3 mb-1">{student.name}</p>
      <p className="my-1">{student.school}</p>
      <p className="my-1">{student.grade}</p>
    </div>
  );
}
