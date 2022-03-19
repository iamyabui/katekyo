import Name from "../../common/form/NameForm";
import IconBig from "../../common/icon/BigIcon";

export default function TeacherProfileEdit(props) {
  const { userName, setUserName } = props;

  return (
    <div className="w-52 h-72 py-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <Name userName={userName} setUserName={setUserName} />
    </div>
  );
}
