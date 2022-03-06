import Consultation from "../../top/teacherDetail/ConsultationButton";
import IconBig from "../../common/icon/BigIcon";

export default function TeacherProfileDetail() {
  return (
    <div className="w-52 py-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <p className="mt-3 mb-1">松丸　慎吾</p>
      <Consultation />
      <p className="my-1">実績</p>
      <p className="my-1">専門</p>
      <p className="my-1">担当科目</p>
      <div className="flex my-1 px-5"></div>
      <p className="my-1">相談方法</p>
    </div>
  );
}
