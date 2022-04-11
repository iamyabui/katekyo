import Consultation from "../../top/teacherDetail/ConsultationButton";
import IconBig from "../../common/icon/BigIcon";
import { teacherUserState } from "../../common/TeacherAtoms";
import { useRecoilValue } from "recoil";

export default function TeacherProfileDetail(props) {
  const { countRecords } = props;
  const teacher = useRecoilValue(teacherUserState)
  const buttonStyle = "bg-white text-origin-purple px-1 my-1 mx-1 rounded"

  return (
    <div className="w-52 py-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <p className="mt-3 mb-1">{teacher.name}</p>
      <Consultation />
      <p className="my-1">実績</p>
      <p className={buttonStyle}>{countRecords}名</p>

      <p className="my-1">専門</p>
      <p className={buttonStyle}>{teacher.category}</p>

      <p className="my-1">担当科目</p>
      <div className="justify-center flex flex-wrap">
      {teacher.subjects.map((subject, index) => (
        <p key={index} className={buttonStyle}>{subject}</p>
      ))}
      </div>

      <p className="my-1">相談方法</p>
        {teacher.consult.chat && (
          <p className={buttonStyle}>チャット</p>
        )}
        {teacher.consult.video && (
          <p className={buttonStyle}>ビデオ通話</p>
        )}
    </div>
  );
}
