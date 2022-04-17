import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { studentUserState } from "../../common/StudentAtoms";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react";

export default function Finish(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { course, setCourses } = props;
  const student = useRecoilValue(studentUserState)

  const handleFinish = async() => {
    const CourseRef = await doc(db, "Courses", course.id, "students", student.id); 
    await updateDoc(CourseRef, { status: "終了申請中", finish_date: serverTimestamp()}) 

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
      <p className="text-sm" onClick={onOpen}>終了</p>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody mt={5}>
            {course.courseInfo.name}を終了しますか？
          </ModalBody>

          <ModalFooter>
          <button 
          onClick={() => {handleFinish(); onClose();}}
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
