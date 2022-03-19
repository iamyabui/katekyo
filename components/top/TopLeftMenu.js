import Category from "../common/pulldown/CategoryPulldown";
import SelectSubjects from "../common/selectButtons/SubjectSelectButtons";
import Budget from "./BudgetPulldown";
import ConsultMethodCheckbox from "./ConsultMethodCheckbox"

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

      <ConsultMethodCheckbox />
      <Budget />
    </div>
  );
}
