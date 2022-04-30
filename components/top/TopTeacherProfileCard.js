import IconBig from "./BigIcon";
import NoIcon from "./NoIcon"
import Router from "next/router";

export default function TopProfile(props) {
  const { teacher } = props;

  const handleMoveToDetailPage = (id) => {
    Router.push({
      pathname: "/topTeacherDetail",
      query: { id: id }
    });
  }

  return (
    <div 
      onClick={() => handleMoveToDetailPage(teacher.id)}
      className="w-52 h-72 py-3 mx-3 bg-card-gray rounded-md flex flex-col justify-center items-center text-gray-700 shadow">
        { !teacher.photo_url ? (
          <NoIcon />
        ):(
          <IconBig photo_url={teacher.photo_url} />
        )}
        <p className="mt-3 mb-1">{teacher.name}</p>
        <p className="my-1 px-6 text-center">{teacher.title}</p>
        <div className="flex flex-wrap mx-3 mx-auto">
        {teacher.subjects.map((subject, index) => (
          <div 
          key ={index}
          className="inline-block bg-subject-gray hover:bg-origin-purple hover:text-white text-origin-purple px-1 my-1 mx-1 rounded hover:cursor-pointer text-xs">
            {subject}
          </div>
        ))}
        </div>
    </div>
  );
}
