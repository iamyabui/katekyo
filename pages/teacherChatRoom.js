import Header from "../components/common/header/header";
import ChatMessage from "../components/chat/chatRoom/ChatMessageBox";
import Send from "../components/chat/chatRoom/SendButton";
import AttachFile from "../components/chat/chatRoom/AttachFileButton";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import Status from "../components/common/buttons/StatusButton";
import Markdown from "../components/common/markdown";

export default function TeacherChatRoom() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <TeacherLeftMenu />
          <div className="mx-auto">
            <div>
              <div className="flex items-center py-2 mb-5">
                <h1 className="text-lg font-bold mr-5">松丸　慎吾</h1>
                <Status />
              </div>
              <Markdown />
              <div className="w-[50rem] py-2 flex justify-between mb-8">
                <AttachFile />
                <Send />
              </div>
            </div>
            <ChatMessage />
          </div>
        </div>
      </div>
    </>
  );
}
