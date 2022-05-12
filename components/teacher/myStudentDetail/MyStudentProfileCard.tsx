import Router from "next/router";
import Status from "../../common/buttons/StatusButton";
import IconBig from "../../common/icon/BigIcon";
import NoIcon from "../../common/icon/NoIcon";

export default function MyStudentProfile(props) {
  const { course } = props;
  const month = course.studentRef.start_date.toDate().getMonth()+1;
  const date = course.studentRef.start_date.toDate().getDate();
  const start_date = `${month}月${date}日`;

  const handleMoveToStudentDetail = (id) => {
    Router.push({
      pathname: "/myStudentDetail",
      query: { id: id }
    });
  }

  return (
    <div 
    className="mx-2 w-40 py-4 bg-card-blue rounded-md flex flex-col justify-center items-center text-gray-700"
    onClick={() =>handleMoveToStudentDetail(course.studentId)}
    >
      { !course.photo_url ? (
        <NoIcon />
      ):(
        <IconBig photo_url={course.photo_url} />
      )}
      <p className="mt-3 mb-3">{course.student_name}</p>
      <Status />
      <p className="mt-2 mb-1 text-sm">{start_date}から受講</p>
    </div>
  );
}
