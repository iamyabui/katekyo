import Header from "../components/common/header";
import StudentLeftMenu from "../components/common/studentLeftMenue";
import MyClassContent from "../components/box/myClassContent";

export default function attendanceStatus() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <StudentLeftMenu />
          <div className="w-[40rem] mx-auto text-gray-700">
            <div>
              <p>申請中のコース</p>
              <MyClassContent />
            </div>
            <div>
              <p className="mt-10">受講中のコース</p>
              <MyClassContent />
            </div>
            <div>
              <p className="mt-10">受講完了履歴</p>
              <MyClassContent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
