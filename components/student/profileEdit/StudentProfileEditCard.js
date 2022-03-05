import Name from "../../common/form/NameForm";
import School from "./SchoolNameForm";
import Grade from "./GradePulldown";
import IconBig from "../../common/icon/BigIcon";

export default function StudentProfileEdit() {
  return (
    <div className="w-52 h-82 py-5 px-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <Name />
      <School />
      <Grade />
    </div>
  );
}
