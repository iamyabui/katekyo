import Approved from "../../common/buttons/StatusButton";
import IconBig from "../../common/icon/BigIcon";

export default function MyStudentProfile(props) {
  const { student } = props;
  console.log(student)
  const month = student.apply_date.toDate().getMonth()+1;
  const date = student.apply_date.toDate().getDate();
  const apply_date = `${month}月${date}日`;

  console.log(student.apply_date.toDate().getDate());
  return (
    <div className="mx-2 w-48 h-64 py-4 bg-card-blue rounded-md flex flex-col justify-center items-center text-gray-700">
      <IconBig />
      <p className="mt-3 mb-3">{student.name}</p>
      <Approved />
      <p className="mt-2 mb-1 text-sm">{apply_date}に申請</p>
    </div>
  );
}
