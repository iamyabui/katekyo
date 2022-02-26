import Subject from "../buttons/subjects";
import IconBig from "../icon/iconBig";

export default function TopProfile() {
  return (
    <div className="w-52 py-5 bg-card-gray rounded-md flex flex-col justify-center items-center text-gray-700">
      <IconBig />
      <p className="mt-3 mb-1">河野　玄太郎</p>
      <p className="my-1 px-6 text-center">数学を嫌いから好きにします！</p>
      <Subject />
    </div>
  );
}
