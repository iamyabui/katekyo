import { useState } from "react";

export default function BurgerMenu() {
  const [menuAppear, setMenuAppear] = useState(false);

  const handleAppearMenu = () => {
    menuAppear ? setMenuAppear(false) : setMenuAppear(true);
  };

  return (
    <>
      <img
        className="h-7 w-7 hover:cursor-pointer"
        src="/menu.png"
        onClick={handleAppearMenu}
      />
      {menuAppear && (
        <div className="absolute top-16">
          <nav className="relative -left-[8em] text-gray-700 bg-white w-[10rem] border border-gray-400 rounded-md">
            <ul className="ml-4 my-5">
              <li className="my-5">HOME</li>
              <li className="my-5">マイページ</li>
              <li className="my-5">ログアウト</li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
