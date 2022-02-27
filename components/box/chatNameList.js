import ChatName from "./chatName";
import Status from "../buttons/status";

export default function ChatNameList() {
  return (
    <div className="h-32 w-[50rem] bg-blue-100 py-2 px-5 rounded">
      <div className="flex items-center py-2 mb-2">
        <ChatName />
        <Status />
      </div>

      <p className="px-5">
        よろしくおねがいします！明日の16時からビデオ相談承知しました！
      </p>
    </div>
  );
}
