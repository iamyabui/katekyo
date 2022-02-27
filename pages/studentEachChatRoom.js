import StudentLeftMenu from "../components/common/studentLeftMenue";
import Header from "../components/common/header";
import ChatMessage from "../components/box/chatMessage";
import EditMessage from "../components/form/editMessage";
import Send from "../components/buttons/send";
import AttachFile from "../components/buttons/attachFile";

export default function StudentChatRoom() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <StudentLeftMenu />
          <div className="mx-auto">
            <div>
              <h1 className="text-lg font-bold mb-5">松丸　慎吾先生</h1>
              <EditMessage />
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
