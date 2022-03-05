import ChatNameList from "../components/chat/chatList/ChatNameList";
import Header from "../components/common/header/header";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";

export default function TeacherChatRoom() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen text-gray-700">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <TeacherLeftMenu />
          <div className="mx-auto">
            <ChatNameList />
          </div>
        </div>
      </div>
    </>
  );
}
