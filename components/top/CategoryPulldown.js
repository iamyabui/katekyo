import { useRecoilState } from "recoil";
import { categoryState } from "../common/TopAtoms";

export default function Category() {
  const [category, setCategory] = useRecoilState(categoryState);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  return (
    <>
    <div className="inline-block relative w-32">
      <select onChange={handleCategory} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="">選択</option>
        <option value="大学受験">大学受験</option>
        <option value="中学受験">中学受験</option>
        <option value="高校受験">高校受験</option>
        <option value="中間期末試験対策">中間期末試験対策</option>
        <option value="センター試験対策">センター試験対策</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
    </>
  );
}
