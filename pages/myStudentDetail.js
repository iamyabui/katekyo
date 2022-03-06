import Header from "../components/common/header/header";
import StudentProfileDetail from "../components/student/profileDetail/StudentProfileDetailCard";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import ShowProfileContent from "../components/teacher/myStudentDetail/ShowProfileContentBox";

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
