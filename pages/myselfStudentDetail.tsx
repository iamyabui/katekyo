import Header from "../components/common/header/header";
import StudentProfileDetailCard from "../components/student/profileDetail/StudentProfileDetailCard";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import ProfileContentBox from "../components/student/profileDetail/ProfileContentBox";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <StudentLeftMenu />
          <StudentProfileDetailCard />
          <ProfileContentBox />
        </div>
      </div>
    </>
  );
}
