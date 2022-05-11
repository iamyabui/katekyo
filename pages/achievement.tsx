import Header from "../components/common/header/header";
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
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
      const StudentsRef = collection(db, "StudentUsers");

      const students = await getDocs(StudentsRef).then(snapshot => {
        const studentArray = [];
        snapshot.docs.forEach((doc) => {
          const id = doc.id;
          const name = doc.data().name;
          studentArray.push({id: id, name: name})
        })
        return studentArray;
      })

      const q = query(RecordsRef, where("teacherID", "==", teacher.id));
      getDocs(q).then((snapshot) => {
        const records = snapshot.docs.map((doc) => {
          const studentId = doc.data().studentID;
          const studentInfo = students.find((student) => (student.id == studentId))
          const student_name = studentInfo.name;
          const record = doc.data();
          const recordWithName = { ...record, student_name }
          return recordWithName;
        })
        setAchievement(records);
    })
    })()  
  },[])
  

  return (
    <>
      <Header />
      <div className="w-screen">
        <div className="flex max-w-6xl mx-auto py-10 h-screen">
          <TeacherLeftMenu />
          <div className="max-w-3xl text-sm px-10 py-5 bg-white rounded-md">
            <p className="text-gray-600 font-bold">実績一覧</p>
            <table>
              <thead>
                <tr className="text-gray-600 border-b-[1px]">
                  <td className="w-[250px] h-[50px]">コース名</td>
                  <td className="w-[110px]">値段</td>
                  <td className="w-[100px]">生徒</td>
                  <td className="w-[80px]">開始日</td>
                  <td className="w-[80px]">終了日</td>
                </tr>
              </thead>
              <tbody>
                {achievement.map((value, index) => (
                  <tr className="border-b-[1px]" key={index}>
                  <td className="h-[50px]">{value.course_name}</td>
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
