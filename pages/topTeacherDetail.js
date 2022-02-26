import Header from "../components/common/header";
import TeacherProfileDetail from "../components/cards/teacherProfileDetail";
import Box from "../components/box/box";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg">
        <div className="flex max-w-4xl m-auto py-10">
          <TeacherProfileDetail />
          <Box />
        </div>
      </div>
    </>
  );
}
