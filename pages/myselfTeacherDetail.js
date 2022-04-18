import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import TeacherProfileDetail from "../components/teacher/profileDetail/TeacherProfileDetailCard";
import Header from "../components/common/header/header";
import DetailBox from "../components/teacher/profileDetail/DetailBox"
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Router from "next/router";
import { teacherUserState } from "../components/common/TeacherAtoms";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../src/firabase";

export default function MyselfTeacherDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [teacher, setTeacher] = useRecoilState(teacherUserState)
  console.log(teacher)
  const userId = teacher.id;
  const teacherRef = doc(db, "TeacherUsers", userId);  
  const [countRecords, setCountRecords] = useState([]);

  useEffect(() => {
    // ログインユーザを確認し、ログインできてなかったらLoginページへ遷移する。
    userId == "" && Router.push("/login");
    teacher.flag !== "teacher" && Router.push("/");

    getDoc(teacherRef).then((snapshot) => {
      if (snapshot.data()) {
        const getUserInfo = snapshot.data();
        setTeacher({...teacher,
          name: getUserInfo.name,
          status: getUserInfo.status,
          photo_url: getUserInfo.photo_url,
          // occupation: "",
          // occupationName: "",
          category: getUserInfo.category,
          subjects: getUserInfo.subjects,
          title: getUserInfo.title,
          detail: getUserInfo.detail,
          consult: getUserInfo.consult,
        })
      }
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      const RecordsRef = collection(db, 'Records');
      const q = query(RecordsRef, where("teacherID", "==", teacher.id));
      const records = await getDocs(q);
      const count = records.docs.length;
      setCountRecords(count);
    })()
  }, [setIsLoading])

  return (
    <>
      {(isLoading || userId || teacher.flag == "teacher" ) && (
        <>
          <Header />
          <div className="bg-top-bg h-screen w-screen ">
            <div className="flex max-w-6xl mx-auto py-10">
              <TeacherLeftMenu />
              <TeacherProfileDetail countRecords={countRecords} />
              <DetailBox />
            </div>
          </div>
        </>
      )}
    </>
  );
}
