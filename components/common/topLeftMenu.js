import Category from "../pulldown/category";
import ConsultMethods from "../checkbox/consultMethods";
import SelectSubjects from "../selectButtons/selectSubjects";
import Budget from "../pulldown/budget";

export default function TopLeftMenu() {
  return (
    <div className="max-w-[15rem] text-gray-800 flex flex-col pr-10 pl-10 mx-5 mt-10 py-5 bg-white rounded-lg">
      <div className="flex flex-col mb-5">
        <label className="py-2 font-bold">カテゴリ</label>
        <Category />
      </div>
      <div className="flex flex-col mb-5">
        <label className="py-2 font-bold">科目</label>
        <div className="flex flex-wrap">
          <SelectSubjects />
        </div>
      </div>

      <ConsultMethods />
      <Budget />
    </div>
  );
}
