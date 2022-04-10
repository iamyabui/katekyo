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
    (async () => {
      const RecordsRef = collection(db, "Records");
      const q = query(RecordsRef, where("teacherID", "==", teacher.id));
      getDocs(q).then((snapshot) => {
        const records = snapshot.docs.map((doc) => {
          return doc.data();
        })
        setAchievement(records);
    })
    })()  
  },[])
  

  return (
    <>
      <Header />
      <div className="bg-top-bg w-screen h-screen">
        <div className="flex max-w-5xl mx-auto py-10 h-screen">
          <TeacherLeftMenu />
          <div className="max-w-3xl text-sm pr-5">
            <table>
              <thead>
                <tr className="font-bold text-gray-600">
                  <td className="w-[250px]">コース名</td>
                  <td className="w-[110px]">値段</td>
                  <td className="w-[100px]">生徒</td>
                  <td className="w-[100px]">開始日</td>
                  <td className="w-[100px]">終了日</td>
                </tr>
              </thead>
              <tbody>
                {achievement.map((value, index) => (
                  <tr key={index}>
                  <td>{value.course_name}</td>
                  <td>{value.course_price}円</td>
                  <td>{value.student_name}</td>
                  <td>{`${value.start_date.toDate().getMonth()+1}月${value.start_date.toDate().getDate()}日`}</td>
                  <td>{`${value.finish_date.toDate().getMonth()+1}月${value.finish_date.toDate().getDate()}日`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
