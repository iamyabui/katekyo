import Header from "../components/common/header/header";
import ProfileContent from "../components/student/profileDetail/ProfileContentBox";
import StudentProfileDetail from "../components/student/profileDetail/StudentProfileDetailCard";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <StudentLeftMenu />
          <StudentProfileDetail />
          <ProfileContent />
        </div>
      </div>
    </>
  );
}
