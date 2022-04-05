import { collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { studentUserState } from "../../common/StudentAtoms";

export default function Finish(props) {
  const { course, setCourses } = props;
  const student = useRecoilValue(studentUserState)

  console.log(course.id)
  console.log(student.id)

  const handleFinish = () => {
    const CourseRef = doc(db, "Courses", course.id, "students", student.id);
    getDoc(CourseRef).then((snapshot) => {
      console.log(snapshot.data());
    })
    updateDoc(CourseRef, { status: "終了申請中", finish_date: serverTimestamp()})

    // 生徒情報を取得
    (async () => {
      const coursesRef = collection(db, "Courses")
      const coursesInfo = await getDocs(coursesRef).then((snapshot) => {
            const coursesArray = [];
            snapshot.docs.forEach((courseDoc) => {              
              const courseId = courseDoc.id;
              const course = courseDoc.data();
              coursesArray.push({ courseId, course })
            })
            return coursesArray;
      })
      setCourses(coursesInfo);
    })();
  }

  return (
    <>
      <button className="bg-origin-gray hover:bg-origin-deepGray text-white px-2 py-1 rounded my-5">
      <p 
      className="text-sm" onClick={handleFinish}>終了</p>
      </button>
    </>
  );
}
