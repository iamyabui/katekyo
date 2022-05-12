import { deleteField, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../src/firabase";

export default function FinishCancel(props) {
  const { course, setStudent } = props;

  const handleCancelApply = () => {
    const CourseRef = doc(db, "Courses", course.courseId, "students", course.studentId);
    updateDoc(CourseRef, { status: "受講中", finish_date: deleteField() })

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
      className="bg-origin-gray hover:bg-origin-deepGray text-white px-2 py-1 rounded mt-1"
      onClick={handleCancelApply}
      >
        <p className="text-sm">キャンセル</p>
      </button>
    </>
  );
}
