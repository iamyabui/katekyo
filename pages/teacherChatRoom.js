import ChatNameList from "../components/box/chatNameList";
import Header from "../components/common/header";
import TeacherLeftMenu from "../components/common/teacherLeftMenu";

export default function StudentChatRoom() {
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
