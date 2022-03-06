import IconBig from "../../common/icon/BigIcon";

export default function TeacherLeftMenu() {
  return (
    <div className="min-w-[20rem] text-gray-800 flex flex-col items-center pl-10">
      <IconBig />
      <p className="text-lg py-2">河野　玄太郎</p>
      <ul className="mt-4">
        <li className="list-none text-base py-2 flex items-center">
          <img src="/profile.png" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            プロフィール
          </p>
        </li>
        <li className="list-none text-base py-2 flex items-center">
          <img src="/chat.png" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            チャットルーム
          </p>
        </li>
        <li className="list-none text-base py-2 flex items-center">
          <img src="/student.png" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            生徒
          </p>
        </li>
        <li className="list-none text-base py-2 flex items-center">
          <img src="/good.png" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            実績
          </p>
        </li>
      </ul>
    </div>
  );
}
