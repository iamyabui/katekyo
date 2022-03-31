import Status from "../../../common/buttons/StatusButton";
import IconSmall from "../../../common/icon/SmallIcon";

export default function ChatNameList(props) {
  const { teacher } = props;
  return (
    <div className="h-32 w-[40rem] bg-blue-100 py-2 px-5 mb-3 rounded">
      <div className="flex items-center py-2 mb-2">
        <div className="flex pl-4 mr-5 items-center">
          <IconSmall />
          <p className="ml-4">{teacher.name}</p>
        </div>
        <Status />
      </div>

      <p className="px-5">
        
      </p>
    </div>
  );
}
