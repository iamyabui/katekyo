import IconBig from "../icon/iconBig";

export default function StudentProfileDetail() {
  return (
    <div className="w-52 h-72 py-5 px-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      <IconBig />
      <p className="mt-3 mb-1">山田　花子</p>
      <p className="my-1">桜学院</p>
      <p className="my-1">高校３年生</p>
    </div>
  );
}
