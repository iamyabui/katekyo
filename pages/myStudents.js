import Header from "../components/common/header/header";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import MyStudentProfile from "../components/teacher/myStudentDetail/MyStudentProfileCard";
import FilterStatus from "../components/teacher/myStudentList/StatusPulldown";

export default function MyStudents() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div className="max-w-3xl">
            <div className="mb-10">
              <FilterStatus />
            </div>
            <div className="flex">
              <MyStudentProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
