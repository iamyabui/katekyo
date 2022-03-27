import Header from "../components/common/header/header";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { db } from "../src/firabase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { teacherUserState } from "../components/common/TeacherAtoms";

export default function Achievement() {
  const teacher = useRecoilValue(teacherUserState);
  const [achievement, setAchievement] = useState([]);

  useEffect(() => {
    const coursesRef = collection(db, "Courses");
    const q = query(coursesRef, where("teacherID", "==", teacher.id));

    getDocs(q).then(snapshot => {
      snapshot.docs.map((doc)=> {
        const courseRef = doc.data();
        const courseId = doc.id;

        const studentsRef = getDocs(collection(db, "Courses", courseId, "students"));
        studentsRef.then(snapshot => {
          const achievement = snapshot.docs.map((doc)=> {
            const studentRef = doc.data();
            return { ...studentRef, courseRef }
          })
          setAchievement(achievement);
        })
      })
    })
  },[])
  

  return (
    <>
      <Header />
      <div className="bg-top-bg w-screen h-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div>
            <Table>
              <Thead>
                <Tr>
                  <Th>コース名</Th>
                  <Th>生徒</Th>
                  <Th>開始日</Th>
                  <Th>終了日</Th>
                </Tr>
              </Thead>
              <Tbody>
                {achievement.map((value, index) => (
                  <Tr key={index}>
                  <Td>{value.courseRef.name}</Td>
                  <Td>{value.name}</Td>
                  <Td>{`${value.start_date.toDate().getMonth()+1}月${value.start_date.toDate().getDate()}日`}</Td>
                  <Td>{`${value.finish_date.toDate().getMonth()+1}月${value.finish_date.toDate().getDate()}日`}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
