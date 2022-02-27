import Header from "../components/common/header";
import StudentProfileDetail from "../components/cards/studentProfileDetail";
import TeacherLeftMenu from "../components/common/teacherLeftMenu";
import ShowProfileContent from "../components/box/showProfileContent";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 mb-5 underline">生徒一覧に戻る</p>
            <div className="flex">
              <StudentProfileDetail />
              <ShowProfileContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
