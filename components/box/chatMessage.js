import ChatName from "./chatName";

export default function ChatMessage() {
  return (
    <div className="h-32 w-[50rem] bg-blue-100 py-2 px-5 rounded">
      <ChatName />
      <p className="px-5 mt-5">
        よろしくおねがいします！明日の16時からビデオ相談承知しました！
      </p>
    </div>
  );
}
