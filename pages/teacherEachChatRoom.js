import Header from "../components/common/header";
import ChatMessage from "../components/box/chatMessage";
import Send from "../components/buttons/send";
import AttachFile from "../components/buttons/attachFile";
import TeacherLeftMenu from "../components/common/teacherLeftMenu";
import Status from "../components/buttons/status";
import Markdown from "../components/common/markdown";

export default function StudentChatRoom() {
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
