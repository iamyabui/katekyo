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
        const studentsInfo = await getDocs(collection(db, "StudentUsers"));
        const studentsInfoArray = studentsInfo.docs.map((doc) => {
          const id = doc.id;
          const photo_url = doc.data().photo_url;
          return { id, photo_url }
        })

        // 生徒一人ずつの情報とコース（course)情報をオブジェクトとして取得。
        studentFinish.docs.map((doc) => {
          const studentId = doc.id;
          const studentRef =doc.data();
          const studentInfo = studentsInfoArray.find((student) => student.id == studentId);
          const photo_url = studentInfo.photo_url;
          coursesArray.push({ ...course, studentRef, studentId, photo_url })
        })

      }))

      // coursesに、各生徒一人ずつの情報とコース（course)情報のオブジェクトを代入。
      setMyStudentList(coursesArray);

      // 受講状況が申請中のコースをフィルター
      setApplyStatus(coursesArray.filter(course => course.studentRef.status == "申請中"));
      
      // 受講状況が受講中かつ、生徒Idが重複するものはフィルター
      const pendingStatus = coursesArray.filter(course => course.studentRef.status == "受講中");
      const filtered_pendingStatus = pendingStatus.filter(function(val1, i, self){
        return self.findIndex(function(val2) {
          return val2.studentId == val1.studentId
        }) == i
      });
      setPendingStatus(filtered_pendingStatus);

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
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div className="w-screen pr-20">
            
            <div>
              <h1 className="font-bold text-sm">申請中のコース</h1>
              {applyStatus.length > 0 ? (
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
                  
                    {applyStatus.map((course, index) => (
                    <tr key={index}>
                    <td className="py-2">{course.name}</td>
                    <td
                    onClick={() => handleMoveToStudentDetail(course.studentId)}
                    className="cursor-pointer text-origin-purple"
                    >{course.studentRef.name}</td>
                    <td>{`${course.studentRef.apply_date.toDate().getMonth()+1}月${course.studentRef.apply_date.toDate().getDate()}日`}</td>
                    <td><ApplyStatus /></td>
                    <td><SendMessageButton studentName={course.studentRef.name} studentId={course.studentId} /></td>
                    </tr>
                    ))}
                  
                  
                    {finishApplyStatus.map((course, index) => (
                    <tr key={index}>
                    <td className="py-2">{course.name}</td>
                    <td 
                    onClick={() => handleMoveToStudentDetail(course.studentId)}
                    className="cursor-pointer text-origin-purple"
                    >{course.studentRef.name}</td>
                    <td>{`${course.studentRef.finish_date.toDate().getMonth()+1}月${course.studentRef.finish_date.toDate().getDate()}日`}</td>
                    <td><FinishApplyStatus /></td>
                    <td><SendMessageButton studentName={course.studentRef.name} studentId={course.studentId} /></td>
                    </tr>
                    ))}
                  
                </tbody>
              </table>
              ):(
                <div className="bg-gray-200 text-sm p-3 mt-3 rounded">
                  <p>申請中の生徒はいません。</p>
                </div>
              )}
            </div>

            <div className="mt-5">
            <h1 className="font-bold text-sm">受講中の生徒</h1>
            {pendingStatus.length > 0 ? (
                <div className="mt-5 flex">
                {pendingStatus.map((course, index) => (
                <div key={index}>
                <MyStudentProfile course={course} />
                </div>
                ))}
                </div>
            ):(
              <div className="bg-gray-200 text-sm p-3 mt-3 rounded">
                <p>受講中の生徒はいません。</p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
