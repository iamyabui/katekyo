export default function Header() {
  return (
    <nav className="max-w-6xl m-auto py-5 px-9 flex justify-between flex-wrap bg-blue text-gray-800">
      <div className="flex">
        <div>
          <p className="text-origin-purple text-2xl pr-9">KATEKYO</p>
        </div>
        <div className="flex items-center">
          <p className="hover: text-origin-purple text-base hover:cursor-pointer">
            先生を探す
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <p className="hover: text-origin-purple text-base hover:cursor-pointer">
          マイページ
        </p>
      </div>
    </nav>
  );
}
