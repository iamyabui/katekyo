import Status from "../../../common/buttons/StatusButton";
import NoIconSmall from "../../../common/icon/NoIconSmall";
import IconSmall from "../../../common/icon/SmallIcon";

export default function ChatNameList(props) {
  const { teacher } = props;
  return (
    <div className="h-32 w-[40rem] bg-blue-100 ml-10 px-5 py-2 mb-3 rounded">
      <div className="flex items-center py-2 mb-2">
        <div className="flex pl-4 mr-5 items-center">
        { !teacher.photo_url ? (
            <NoIconSmall />
          ):(
            <IconSmall photo_url={teacher.photo_url} />
          )}
          <p className="ml-4">{teacher.teacherName}</p>
        </div>
        {teacher.isStatus && <Status /> }
      </div>

      {teacher.latestMessage ? (
        <p className="px-5">
          {(!teacher.latestMessage.message && teacher.latestMessage.file_url) && <p>画像が送信されました</p>}
          {teacher.latestMessage.message && teacher.latestMessage.message}
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
