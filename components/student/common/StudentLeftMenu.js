import IconBig from "../../common/icon/BigIcon";

export default function StudentLeftMenu() {
  return (
    <div className="min-w-[15rem] text-gray-800 flex flex-col items-center pr-20 pl-10">
      <IconBig />
      <p className="text-lg py-2">山田　花子</p>
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
          <img src="/class.png" />
          <p className="pl-3 pr-2 hover:text-origin-purple hover:cursor-pointer">
            受講状況
          </p>
        </li>
      </ul>
    </div>
  );
}
