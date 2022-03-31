import IconSmall from "../../common/icon/SmallIcon";

export default function ChatMessage(props) {
  const { message, senderName } = props;
  return (
    <div className="h-32 w-[40rem] bg-blue-100 py-2 px-5 mb-3 rounded">
    <div className="flex pl-4 mr-5 items-center">
      <IconSmall />
      <p className="ml-4">{senderName}</p>
    </div>
      <p className="px-5 mt-5">
        {message}
      </p>
    </div>
  );
}
