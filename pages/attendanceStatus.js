import Header from "../components/common/header/header";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../src/firabase";
import { studentUserState } from "../components/common/StudentAtoms";
import { useRecoilValue } from "recoil";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Cancel from "../components/student/attendanceStatus/CancelButton";
import Finish from "../components/student/attendanceStatus/FinishButton";

export default function AttendanceStatus() {
  const student = useRecoilValue(studentUserState);
  const [courses, setCourses] = useState([]);
  const [courseListWithStudent, setCourseListWithStudent] = useState([]);
  const [applyStatus, setApplyStatus] = useState([]);
  const [pendingStatus, setPendingStatus] = useState([]);
  const [finishStatus, setFinishStatus] = useState([]);

  // ①コース情報をコースIDとコース名、値段で取得
  useEffect(() => {

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
  },[])

  // ②ログイン生徒ユーザーが登録したコースと受講ステータスの取得
  useEffect(() => {
    (async () => {
      const courseListWithStudentInfoArray =  await Promise.all(courses.map(async (course) => {
        const studentRef = await getDoc(doc(db, "Courses", course.courseId, "students", student.id));
        const teacherRef = await getDoc(doc(db, "TeacherUsers", course.course.teacherID ))
        const studentInfo = studentRef.data(); 
        const teacherName = teacherRef.data().name;
        if(studentInfo !== undefined){
          const id = course.courseId;
          const courseInfo = course.course;
          return { id, courseInfo, teacherName, studentInfo };
        }
        }))
      
      const courseListWithStudentInfo = courseListWithStudentInfoArray.filter(Boolean)
      setCourseListWithStudent(courseListWithStudentInfo)      

      setApplyStatus(courseListWithStudentInfo.filter(course => course.studentInfo.status == "申請中"));
      setPendingStatus(courseListWithStudentInfo.filter(course => course.studentInfo.status == "受講中" || course.studentInfo.status == "終了申請中"));
    })();
  },[courses])

  useEffect(() => {
    (async () => {
      const RecordsRef = collection(db, "Records");
      const q = query(RecordsRef, where("studentID", "==", student.id));
      getDocs(q).then((snapshot) => {
        const records = snapshot.docs.map((doc) => {
          return doc.data();
        })
        setFinishStatus(records);
    })
    })()  
  },[courses])

  return (
    <>
      <Header />
      <div className="w-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <StudentLeftMenu />
          <div className="w-[40rem] text-gray-700 bg-white px-10 py-10 rounded">
            <div className="mb-5">
              <p className="font-bold text-gray-600">申請中のコース</p>
              {applyStatus.length > 0 ? (
              applyStatus.map((course, index) => (
                <div key={index} className="mx-auto items-center px-5 py-4 my-2 flex justify-between w-[30rem] bg-card-blue rounded">
                  <div className="text-sm">
                  <div className="flex">
                    <p className="font-bold text-gray-600 mr-3">コース名</p>
                    <p>{course.courseInfo.name}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-gray-600 mr-3">値段</p>
                    <p>{course.courseInfo.price}円</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-gray-600 mr-3">講師名</p>
                    <p>{course.teacherName}</p>
                  </div>
                  <div className="flex">
                    <p className="font-bold text-gray-600 mr-3">申請日</p>
                    <p>{`${course.studentInfo.apply_date.toDate().getMonth()+1}月${course.studentInfo.apply_date.toDate().getDate()}日`}</p>
                  </div>
                </div>
                  <div>
                    <Cancel courseId={course.id} setCourses={setCourses} />
                  </div>
                </div>
              ))
              ):(
                <div className="mx-auto items-center px-5 py-4 my-2 w-[30rem] bg-card-gray rounded">
                  申請中のコースはありません
                </div>
              )}
            </div>

            <div className="mb-5">
              <p className="font-bold text-gray-600">受講中のコース</p>
              {pendingStatus.length > 0 ? (
              pendingStatus.map((course, index) => (
                <div key={index} className="mx-auto items-center px-5 py-4 my-2 flex justify-between w-[30rem] bg-card-blue rounded">
                  <div className="text-sm">
                  <div className="flex">
                    <p className="w-[100px] font-bold text-gray-600 mr-3">コース名</p>
                    <p className="w-[250px]">{course.courseInfo.name}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[100px] font-bold text-gray-600 mr-3">値段</p>
                    <p className="w-[250px]">{course.courseInfo.price}円</p>
                  </div>
                  <div className="flex">
                    <p className="w-[100px] font-bold text-gray-600 mr-3">講師名</p>
                    <p className="w-[250px]">{course.teacherName}</p>
                  </div>
                  <div className="flex">
                    <p className="w-[100px] font-bold text-gray-600 mr-3">受講開始日</p>
                    <p className="w-[250px]">{`${course.studentInfo.start_date.toDate().getMonth()+1}月${course.studentInfo.start_date.toDate().getDate()}日`}</p>
                  </div>
                </div>
                  <div>
                    {course.studentInfo.status == "受講中" && (
                    <Finish course={course} setCourses={setCourses} />
                    )}
                    {course.studentInfo.status == "終了申請中" && (
                    <p className="text-sm text-origin-pink">終了申請中</p>
                    )}
                  </div>
                </div>
              ))
              ):(
                <div className="mx-auto items-center px-5 py-4 my-2 w-[30rem] bg-card-gray rounded">
                  受講中のコースはありません
                </div>
              )}
            </div>

            <div>
            
              <>
              <p className="font-bold mt-10 text-gray-600">受講完了履歴</p>
              {finishStatus.length > 0 ? (
              <Table>
                <Thead>
                  <Tr>
                    <Th>コース名</Th>
                    <Th>値段</Th>
                    <Th>開始日</Th>
                    <Th>完了日</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {finishStatus.map((course, index) => (
                    <Tr key={index} className="text-sm">
                    <Td><p>{course.course_name}</p></Td>
                    <Td><p>{course.course_price}</p></Td>
                    <Td>{`${course.start_date.toDate().getMonth()+1}月${course.start_date.toDate().getDate()}日`}</Td>
                    <Td>{`${course.finish_date.toDate().getMonth()+1}月${course.finish_date.toDate().getDate()}日`}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              ):(
                <div className="mx-auto items-center px-5 py-4 my-2 w-[30rem] bg-card-gray rounded">
                  受講したコースはありません
                </div>
              )}
              </>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
