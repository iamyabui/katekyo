import ChatNameList from "../components/chat/chatList/ChatNameList";
import Header from "../components/common/header/header";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";

export default function StudentChatRoom() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <StudentLeftMenu />
          <div className="mx-auto">
            <ChatNameList />
          </div>
        </div>
      </div>
    </>
  );
}
