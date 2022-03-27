import Header from "../components/common/header/header";
import MyStudentProfileDetailCard from "../components/teacher/myStudentDetail/MyStudentProfileDetailCard"
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import ShowProfileContent from "../components/teacher/myStudentDetail/ShowProfileContentBox";
// import MyStudentProfile from "../components/teacher/myStudentDetail/MyStudentProfileCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../src/firabase";
import { useRecoilValue } from "recoil";
import { teacherUserState } from "../components/common/TeacherAtoms";

export default function TopTeacherDetail() {
  const teacher = useRecoilValue(teacherUserState);
  const router = useRouter();
  const studentId = router.query.id;
  const [student, setStudent] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // 生徒情報を取得
    const StudentRef = getDoc(doc(db, "StudentUsers", studentId))
    StudentRef.then(snapshot => {
      if (snapshot.data()) {
        const student = snapshot.data();
        setStudent(student);
    }})

    // 該当ログイン先生ユーザーIDを持つcourseIDを全て取得
    const coursesRef = collection(db, "Courses")
    const myCourses = query(coursesRef, where("teacherID", "==", teacher.id));

    // 該当courseIDを取得できたら、またCoursesコレクションから該当courseID＞生徒コレクション内情報を取得
    getDocs(myCourses).then(snapshot => {
          snapshot.docs.map((courseDoc) => {              
            // ログイン先生ユーザ担当コースを受講した生徒を全て取得
            const courseId = courseDoc.id;
            const allStudentsRef = collection(db, "Courses", courseId, "students");
            
            // 担当コース受講生徒の中から、指定した生徒が受講したもしくは受講済のコース内容と生徒の情報を取得
            getDocs(allStudentsRef).then(snapshot => {
              const courses = snapshot.docs.map((studentDoc) => {
                const id = studentDoc.id;
                const studentRef = studentDoc.data()
                const courseRef = courseDoc.data();
                if (id == studentId) {
                  return {...studentRef, courseRef};
                }
              }).filter(Boolean);
              setCourses(courses);
            })
          })
    })
  },[])

  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-700 mb-5 underline">生徒一覧に戻る</p>
            <div className="flex">
              <MyStudentProfileDetailCard student={student}/>
              <ShowProfileContent courses={courses} student={student} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
