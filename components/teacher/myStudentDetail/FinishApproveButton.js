import { collection, deleteDoc, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function FinishApprove(props) {
  const teacher = useRecoilValue(teacherUserState);
  const { course, setStudent } = props;

  const handleApprove = () => {
    (async () => {
      const CourseRef = doc(db, "Courses", course.courseId, "students", course.studentId);
      const CourseSnap = await getDoc(CourseRef);
      const student_status = CourseSnap.data();
      const start_date = student_status.start_date.toDate();
      const finish_date = student_status.finish_date.toDate();

      const RecordsRef = doc(collection(db, "Records"));
      await setDoc(RecordsRef, { 
        courseID: course.courseId, 
        course_name: course.courseName, 
        course_price: course.coursePrice, 
        teacherID: teacher.id,
        studentID: course.studentId, 
        student_name: student_status.name, 
        start_date: Timestamp.fromDate(new Date(start_date)),
        finish_date: Timestamp.fromDate(new Date(finish_date)),
      })

      await deleteDoc(CourseRef)

      // 生徒情報を取得
      const StudentRef = getDoc(doc(db, "StudentUsers", course.studentId))
      StudentRef.then(snapshot => {
        if (snapshot.data()) {
          const studentId = snapshot.id;
          const student = snapshot.data();
          setStudent({studentId, student});
      }})

    })()
  }

  return (
    <>
      <button 
      className="bg-origin-pink hover:bg-origin-deepPink text-white px-5 py-1 rounded"
      onClick={handleApprove}
      >
      <p className="text-sm">承認</p>
      </button>
    </>
  );
}
