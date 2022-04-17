import IconBig from "../../common/icon/BigIcon";
import NoIcon from "../../common/icon/NoIcon";

export default function MyStudentProfileDetailCard(props) {
  const { student, photo_url } = props;

  return (
    <div className="w-52 h-72 py-5 px-5 bg-card-purple rounded-md flex flex-col justify-center items-center text-gray-700">
      <p className="my-1">Profile</p>
      {!photo_url ? (
        <NoIcon />
      ):(
        <IconBig photo_url={photo_url}/>
      )}
      
      <p className="mt-3 mb-1">{student.student?.name}</p>
      <p className="my-1">{student.student?.school}</p>
      <p className="my-1">{student.student?.grade}</p>
    </div>
  );
}
