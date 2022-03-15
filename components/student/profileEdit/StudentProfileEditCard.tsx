import IconBig from "../../common/icon/BigIcon";
import EditNameForm from "./EditNameForm";
import EditSchoolNameForm from "./EditSchoolNameForm";
import EditGradePulldown from "./EditGradePulldown";

export default function StudentProfileEditCard() {
  const school = EditSchoolNameForm();

  return (
    <div className="w-52 h-82 py-5 px-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <EditNameForm />
      <EditSchoolNameForm />
      <EditGradePulldown />
    </div>
  );
}
