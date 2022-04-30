import Category from "./CategoryPulldown";
import SubjectSelectButtons from "./selectButtons/SubjectSelectButtons";
import Budget from "./BudgetPulldown";
import ConsultMethodCheckbox from "./ConsultMethodCheckbox"
import SearchButton from "./SearchButton"

export default function TopLeftMenu() {
  return (
    <div className="max-w-[15rem] text-gray-800 flex flex-col pr-10 pl-10 mx-5 my-10 py-10 bg-white rounded-lg shadow">
      <div className="flex flex-col mb-5">
        <label className="py-2 font-bold">カテゴリ</label>
        <Category />
      </div>
      <div className="flex flex-col mb-5">
        <label className="py-2 font-bold">科目</label>
        <div className="flex flex-wrap">
          {/* <SubjectSelectButtons /> */}
        </div>
      </div>

      <ConsultMethodCheckbox />
      <Budget />
      <SearchButton />
    </div>
  );
}
