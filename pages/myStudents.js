import { collection, doc, getDocs, query, where } from "firebase/firestore";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ApplyStatus from "../components/common/buttons/ApplyStatusButton";
import FinishApplyStatus from "../components/common/buttons/FinishApplyStatusButton";
import Header from "../components/common/header/header";
import { teacherUserState } from "../components/common/TeacherAtoms";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import MyStudentProfile from "../components/teacher/myStudentDetail/MyStudentProfileCard";
import FilterStatus from "../components/teacher/myStudentList/StatusPulldown";
import SendMessageButton from "../components/teacher/myStudentDetail/SendMessageButton"
import { db } from "../src/firabase";

export default function MyStudents() {
  const teacher = useRecoilValue(teacherUserState);
  const [myStudentList, setMyStudentList] = useState([]);
  const [applyStatus, setApplyStatus] = useState([]);
  const [finishApplyStatus, setFinishApplyStatus] = useState([]);
  const [pendingStatus, setPendingStatus] = useState([]);
  
  useEffect(() => {
    (async () => {
      const coursesRef = collection(db, "Courses");
      const q = query(coursesRef, where("teacherID", "==", teacher.id));
      const coursesStudents = await getDocs(q);

      const courseWithStudentsArray = coursesStudents.docs.map((doc)=> {
          const courseRef = doc.data();
          const courseName =courseRef.name;
          const coursePrice = courseRef.price;
          const courseId = doc.id;
          return { name: courseName, price: coursePrice, courseId: courseId }
      })

      // courseArray: コース＆そのコースを受講した生徒情報のセットを配列で取得。
      const coursesArray = [];
      await Promise.all(courseWithStudentsArray.map(async (course) => {
        // 受講が終了している生徒（複数）情報を取得。
        const studentsRef = collection(db, "Courses", course.courseId, "students");
        const studentFinish = await getDocs(studentsRef);

        // 生徒一人ずつの情報とコース（course)情報をオブジェクトとして取得。
        studentFinish.docs.map((doc) => {
          const studentId = doc.id;
          const studentRef =doc.data();
          coursesArray.push({ ...course, studentRef, studentId })
        })

      }))
      console.log(coursesArray)
      setMyStudentList(coursesArray);

      setApplyStatus(coursesArray.filter(course => course.studentRef.status == "申請中"));
      setPendingStatus(coursesArray.filter(course => course.studentRef.status == "受講中"));
      setFinishApplyStatus(coursesArray.filter(course => course.studentRef.status == "終了申請中"));

    })()  
}, [])

  const handleMoveToStudentDetail = (id) => {
    Router.push({
      pathname: "/myStudentDetail",
      query: { id: id }
    });
  }

  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <TeacherLeftMenu />
          <div className="max-w-3xl">
            <div className="mb-10">
              {/* <FilterStatus /> */}
            </div>
            <div>
              <h1 className="font-bold text-sm">申請中のコース</h1>
              <table className="mt-5 text-sm">
                <thead>
                  <tr>
                    <td className="w-[200px] py-2">コース名</td>
                    <td className="w-[100px]">生徒名</td>
                    <td className="w-[100px]">申請日</td>
                    <td className="w-[100px]">ステータス</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {applyStatus.map((course) => (
                    <>
                    <td className="py-2">{course.name}</td>
                    <td
                    onClick={() => handleMoveToStudentDetail(course.studentId)}
                    className="cursor-pointer text-origin-purple"
                    >{course.studentRef.name}</td>
                    <td>{`${course.studentRef.apply_date.toDate().getMonth()+1}月${course.studentRef.apply_date.toDate().getDate()}日`}</td>
                    <td><ApplyStatus /></td>
                    <td><SendMessageButton studentName={course.studentRef.name} studentId={course.studentId} /></td>
                    </>
                    ))}
                  </tr>
                  <tr>
                    {finishApplyStatus.map((course) => (
                    <>
                    <td className="py-2">{course.name}</td>
                    <td 
                    onClick={() => handleMoveToStudentDetail(course.studentId)}
                    className="cursor-pointer text-origin-purple"
                    >{course.studentRef.name}</td>
                    <td>{`${course.studentRef.finish_date.toDate().getMonth()+1}月${course.studentRef.finish_date.toDate().getDate()}日`}</td>
                    <td><FinishApplyStatus /></td>
                    </>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-5">
            <h1 className="font-bold text-sm">受講中の生徒</h1>
                <div className="mt-5">
                {pendingStatus.map((course) => (
                <>
                <MyStudentProfile course={course} />
                </>
                ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
