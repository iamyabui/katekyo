import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";

export default function Approve(props) {
  const { course, student, setStudent } = props;

  const handleApprove = () => {
    const CourseRef = doc(db, "Courses", course.courseId, "students", student.studentId);
    updateDoc(CourseRef, { status: "受講中", start_date: serverTimestamp()})

    // 生徒情報を取得
    const StudentRef = getDoc(doc(db, "StudentUsers", student.studentId))
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
