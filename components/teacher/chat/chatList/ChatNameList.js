import Status from "../../../common/buttons/StatusButton";
import IconSmall from "../../../common/icon/SmallIcon";

export default function ChatNameList(props) {
  const { student } = props;
  return (
    <div className="w-[35rem] bg-blue-100 px-5 pt-2 pb-5 rounded">
      <div className="flex items-center py-2 mb-2">
        <div className="flex pl-4 mr-5 items-center">
          <IconSmall />
          <p className="ml-4">{student.studentName}</p>
        </div>
        {student.isStatus && <Status /> }
      </div>

      {student.latestMessage ? (
        <p className="px-5">
          {student.latestMessage.message}
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
