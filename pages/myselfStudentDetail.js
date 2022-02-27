import Header from "../components/common/header";
import StudentLeftMenu from "../components/common/studentLeftMenue";
import StudentProfileDetail from "../components/cards/studentProfileDetail";
import EditProfileContent from "../components/box/editProfileContent";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <StudentLeftMenu />
          <StudentProfileDetail />
          <EditProfileContent />
        </div>
      </div>
    </>
  );
}
