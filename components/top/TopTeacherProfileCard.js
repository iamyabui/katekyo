import Subject from "../common/selectButtons/SubjectButton";
import IconBig from "../common/icon/BigIcon";

export default function TopProfile() {
  return (
    <div className="w-52 h-72 py-3 mx-3 mb-3 bg-card-gray rounded-md flex flex-col justify-center items-center text-gray-700">
      <IconBig />
      <p className="mt-3 mb-1">河野　玄太郎</p>
      <p className="my-1 px-6 text-center">数学を嫌いから好きにします！</p>
      <Subject />
    </div>
  );
}
