import { collection, doc, getDocs, query, where } from "firebase/firestore";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Header from "../components/common/header/header";
import { teacherUserState } from "../components/common/TeacherAtoms";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import MyStudentProfile from "../components/teacher/myStudentDetail/MyStudentProfileCard";
import FilterStatus from "../components/teacher/myStudentList/StatusPulldown";
import { db } from "../src/firabase";

export default function MyStudents() {
  const teacher = useRecoilValue(teacherUserState);
  const [myStudentList, setMyStudentList] = useState([]);

  
  useEffect(() => {
    // 該当ログイン先生ユーザーIDを持つcourseIDを全て取得
    const coursesRef = collection(db, "Courses")
    const q = query(coursesRef, where("teacherID", "==", teacher.id));

    // 該当courseIDを取得できたら、またCoursesコレクションから該当courseID＞生徒コレクション内情報を取得
    getDocs(q).then(snapshot => {
          snapshot.docs.map((doc) => {
           const myStudentsRef = collection(db, "Courses", doc.id, "students");
           getDocs(myStudentsRef).then(snapshot => {
             const students = snapshot.docs.map((doc) =>{
               const studentId = doc.id;
               const name = doc.data().name;
               const status = doc.data().status;
               const apply_date = doc.data().apply_date;
               const start_date = doc.data().start_date;
               const finish_date = doc.data().finish_date;
               return {
                 id: studentId,
                 name: name,
                 status: status,
                 apply_date: apply_date,
                 start_date: start_date,
                 finish_date: finish_date,
               }
             })
             setMyStudentList(students);
           })
        })

    })
}, [])

  const handleMoveToStudentDetail = (id) => {
    Router.push({
      pathname: "/myStudentDetail",
      query: { id: id }
    });
  }

  return (
    <>
    {console.log(myStudentList)}
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div className="max-w-3xl">
            <div className="mb-10">
              <FilterStatus />
            </div>
            <div className="flex">
              {myStudentList.map((student, index) => (
                <div onClick={() => handleMoveToStudentDetail(student.id)} key={index}>
                  <MyStudentProfile student={student} />
                  {console.log(student)}
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
