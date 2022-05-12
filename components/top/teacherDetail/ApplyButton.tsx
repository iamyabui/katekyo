import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { studentUserState } from "../../common/StudentAtoms";

export default function Apply(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { courseName, courseId, coursePrice , teacherId, teacherEmail, setCourseList } = props;
  const student = useRecoilValue(studentUserState);

  const handleApply = async (courseId) => {
    console.log(courseId);
    const CourseRef = doc(db, "Courses", courseId, "students", student.id);
    const StudentRef = doc(db, "StudentUsers", student.id, "courses", courseId)
    
    // Courseコレクションにログイン生徒IDドキュメントとフィールドを追加する。
    setDoc(CourseRef, {
      status: "申請中",
      apply_date: serverTimestamp()
    })
    // Studentコレクションにコース名とコースの値段を追加する。
    setDoc(StudentRef, {
      name: courseName,
      price: coursePrice,
    })

    // 先生と生徒両方に対して連絡先リストに追加
    const contactsStudentCollectionRef = doc(db, "StudentUsers", student.id, "contacts", teacherId);
    const contactsTeacherCollectionRef = doc(db, "TeacherUsers", teacherId, "contacts", student.id);

    setDoc(contactsStudentCollectionRef, {
      email: teacherEmail,
    });

    setDoc(contactsTeacherCollectionRef, {
      email: student.email,
    });

    // Chatsコレクション内sender_userとreceive_userに、生徒と先生が既に登録されていないかを確認する。
    // （既にあるのに、新しいドキュメントが作成するのを防ぐため）
    const ChatsRef = await collection(db, "Chats")
    const registrationCheck = await getDocs(ChatsRef).then(snapshot => {
      const resultArray = snapshot.docs.map((chat) => {
        const contact1 = chat.data().sender_user;
        const contact2 = chat.data().receive_user;

        if((contact1 == student.id && contact2 == teacherId) || (contact1 == teacherId && contact2 == student.id)) {
          return true;
        }
      })

      // もし既に登録されている場合は、trueを返し、登録されていない場合はundefinedが返される。
      const result = resultArray.find(value => {return value == true})
      return result;
    })

    // 登録有無のチェックの結果、登録されていない場合は、新しいドキュメントが作成されてsender_userとreceive_userが登録される。
    await registrationCheck !== true && (
      addDoc(collection(db, "Chats"), {
      sender_user: student.id, 
      receive_user: teacherId,
    })
    )

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
