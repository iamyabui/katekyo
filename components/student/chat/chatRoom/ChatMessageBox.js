import { useRecoilValue } from "recoil";
import NoIconSmall from "../../../common/icon/NoIconSmall";
import IconSmall from "../../../common/icon/SmallIcon";
import { studentUserState } from "../../../common/StudentAtoms";

export default function ChatMessage(props) {
  const { message, file_url, senderId, teacher } = props;
  const student = useRecoilValue(studentUserState);

  return (
    <div className="w-[40rem] bg-blue-100 py-5 px-5 mb-3 rounded">
    <div className="flex pl-4 mr-5 items-center">
    {senderId == teacher.id && (
        !teacher.photo_url ? (
          <>
          <NoIconSmall />
          <p className="ml-4">{teacher.name}</p>
          </>
        ):(
          <>
          <IconSmall photo_url={teacher.photo_url} />
          <p className="ml-4">{teacher.name}</p>
          </>
        )
      )}
      {senderId == student.id && (
        !student.photo_url ? (
          <>
          <NoIconSmall />
          <p className="ml-4">{student.name}</p>
          </>
        ):(
          <>
          <IconSmall photo_url={student.photo_url} />
          <p className="ml-4">{student.name}</p>
          </>
        )
      )}
      {/* <p className="ml-4">{senderId}</p> */}
    </div>
      <p className="px-5 mt-5 text-sm">
        {message}
        {file_url && (
          <img 
          src={file_url} 
          alt="img" 
          id="image" 
          className="h-[200px]" 
          />
        )}
      </p>
    </div>
  );
}
