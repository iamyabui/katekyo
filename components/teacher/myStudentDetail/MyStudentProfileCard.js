import Approved from "../../common/buttons/StatusButton";
import IconBig from "../../common/icon/BigIcon";

export default function MyStudentProfile() {
  return (
    <div className="w-52 py-5 bg-card-blue rounded-md flex flex-col justify-center items-center text-gray-700">
      <IconBig />
      <p className="mt-3 mb-3">山田　花子</p>
      <Approved />
      <p className="mt-2 mb-1">2022/2/1に申請</p>
    </div>
  );
}
