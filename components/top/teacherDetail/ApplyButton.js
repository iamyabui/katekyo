import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { studentUserState } from "../../common/StudentAtoms";

export default function Apply(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { courseName, courseId, coursePrice , teacherId, setCourseList } = props;
  const student = useRecoilValue(studentUserState);

  const handleApply = async (courseId) => {
    console.log(courseId);
    const CourseRef = doc(db, "Courses", courseId, "students", student.id);
    const StudentRef = doc(db, "StudentUsers", student.id, "courses", courseId)
    
    // Courseコレクションにログイン生徒IDドキュメントとフィールドを追加する。
    setDoc(CourseRef, {
      name: student.name,
      status: "申請中",
      apply_date: serverTimestamp()
    })
    // Studentコレクションにコース名とコースの値段を追加する。
    setDoc(StudentRef, {
      name: courseName,
      price: coursePrice,
    })

    // 再レンダリング(CourseListを更新すると、topTeacherDetailの②も再レンダリングされる。)
    const coursesRef = collection(db, 'Courses');
    const myCoursesRef = query(coursesRef, where('teacherID', '==', teacherId));

    const coursesInfo = await getDocs(myCoursesRef).then((snapshot) => {
      const coursesArray = [];
      snapshot.docs.forEach((doc) => {
        const id = doc.id;
        const name = doc.data().name;
        const price = doc.data().price;
        coursesArray.push({ id, name, price });
      });
      return coursesArray;
    });

    setCourseList(coursesInfo);
  }

  return (
    <>
      <button 
      onClick={onOpen}
      className="bg-origin-pink hover:bg-origin-deepPink text-white px-2 py-1 rounded">
        申請する
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={5}>
            {courseName}のコースを申請しますか？
          </ModalBody>

          <ModalFooter>
          <button 
          onClick={() => {handleApply(courseId); onClose();}}
          className="bg-origin-pink hover:bg-origin-deepPink text-white px-5 py-1 rounded">
            OK
          </button>
          <button 
          onClick={onClose}
          className="ml-3 bg-gray-400 text-white hover:bg-gray-500 px-2 py-1 rounded">
            キャンセル
          </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
    
  );
}
