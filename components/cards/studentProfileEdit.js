import Name from "../form/profileName";
import School from "../form/schoolName";
import Grade from "../pulldown/grade";
import IconBig from "../icon/iconBig";

export default function StudentProfileEdit() {
  return (
    <div className="w-52 py-5 px-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <Name />
      <School />
      <Grade />
    </div>
  );
}
