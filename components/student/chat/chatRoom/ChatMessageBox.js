import { useRecoilValue } from "recoil";
import NoIconSmall from "../../../common/icon/NoIconSmall";
import IconSmall from "../../../common/icon/SmallIcon";
import { studentUserState } from "../../../common/StudentAtoms";

export default function ChatMessage(props) {
  const { message, senderName, teacher } = props;
  const student = useRecoilValue(studentUserState);

  return (
    <div className="w-[40rem] bg-blue-100 py-5 px-5 mb-3 rounded">
    <div className="flex pl-4 mr-5 items-center">
    {senderName == teacher.name && (
        !teacher.photo_url ? (
          <NoIconSmall />
        ):(
          <IconSmall photo_url={teacher.photo_url} />
        )
      )}
      {senderName == student.name && (
        !student.photo_url ? (
          <NoIconSmall />
        ):(
          <IconSmall photo_url={student.photo_url} />
        )
      )}
      <p className="ml-4">{senderName}</p>
    </div>
      <p className="px-5 mt-5 text-sm">
        {message}
      </p>
    </div>
  );
}
