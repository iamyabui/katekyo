import Status from "../../../common/buttons/StatusButton";
import NoIconSmall from "../../../common/icon/NoIconSmall";
import IconSmall from "../../../common/icon/SmallIcon";

export default function ChatNameList(props) {
  const { student } = props;
  return (
    <div className="w-[40rem] bg-blue-100 ml-10 px-5 pt-2 pb-5 rounded">
      <div className="flex items-center py-2 mb-2">
        <div className="flex pl-4 mr-5 items-center">
          { !student.photo_url ? (
            <NoIconSmall />
          ):(
            <IconSmall photo_url={student.photo_url} />
          )}
          
          <p className="ml-4">{student.studentName}</p>
        </div>
        {student.isStatus && <Status /> }
      </div>

      {student.latestMessage ? (
        <p className="px-5">
          {(!student.latestMessage.message && student.latestMessage.file_url) && <p>画像が送信されました</p>}
          {student.latestMessage.message && <p className="truncate">{student.latestMessage.message}</p>}
        </p>
      ) : (
        <p className="px-5">
          メッセージはまだありません。
        </p>
      )
      }
    </div>
  );
}
