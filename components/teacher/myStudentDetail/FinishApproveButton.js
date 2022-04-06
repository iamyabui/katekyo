import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";

export default function FinishApprove(props) {
  const { course, setStudent } = props;

  const handleApprove = () => {
    const CourseRef = doc(db, "Courses", course.courseId, "students", course.studentId);
    updateDoc(CourseRef, { status: "終了" })

    // 生徒情報を取得
    const StudentRef = getDoc(doc(db, "StudentUsers", course.studentId))
    StudentRef.then(snapshot => {
      if (snapshot.data()) {
        const studentId = snapshot.id;
        const student = snapshot.data();
        setStudent({studentId, student});
    }})

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
