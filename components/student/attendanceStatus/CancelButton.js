import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { studentUserState } from "../../common/StudentAtoms";

export default function Cancel(props) {
  const { courseId, setCourses } = props;
  const student = useRecoilValue(studentUserState)

  const handleCancelApply = () => {
    const courseRef = doc(db, "Courses", courseId, "students", student.id);
    const studentRef = doc(db, "StudentUsers",student.id, "courses", courseId);

    deleteDoc(courseRef);
    deleteDoc(studentRef);

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
      <button 
      className="bg-origin-gray hover:bg-origin-deepGray text-white px-2 py-1 rounded my-5"
      onClick={handleCancelApply}
      >
        <p className="text-sm">申請をキャンセル</p>
      </button>
    </>
  );
}
