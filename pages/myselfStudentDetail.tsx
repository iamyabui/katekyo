import Header from "../components/common/header/header";
import StudentProfileDetailCard from "../components/student/profileDetail/StudentProfileDetailCard";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import ProfileContentBox from "../components/student/profileDetail/ProfileContentBox";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import Router from "next/router";
import { studentUserState } from "../components/common/StudentAtoms";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../src/firabase";

export default function MyselfStudentDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [student, setStudent] =useRecoilState(studentUserState)
  const userId = student.id;
  const studentRef = doc(db, "StudentUsers", userId);

  useEffect(() => {
    // ログインユーザを確認し、ログインできてなかったらLoginページへ遷移する。
    userId == "" && Router.push("/login");
    student.flag !== "student" && Router.push("/");

    getDoc(studentRef).then((snapshot) => {
      if (snapshot.data()) {
        const getUserInfo = snapshot.data();
        setStudent({
          ...student,
          name: getUserInfo.name,
          school: getUserInfo.school,
          grade: getUserInfo.grade,
          text: getUserInfo.text,
          goal: getUserInfo.goal,
          request: getUserInfo.request,
          photo_url: getUserInfo.photo_url,
        });
      }
    });

    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <>
      {(isLoading || userId || student.flag == "student" ) && (
        <>
          <Header />
          <div className="w-screen">
            <div className="flex max-w-6xl mx-auto py-10">
              <StudentLeftMenu />
              <StudentProfileDetailCard />
              <ProfileContentBox />
            </div>
          </div>
        </>
      )}
    </>
  );
}
