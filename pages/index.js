import Head from "next/head";
import Header from "../components/common/header/header";
import TopLeftMenu from "../components/top/TopLeftMenu";
import TopProfile from "../components/top/TopTeacherProfileCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../src/firabase"
import { useEffect } from "react";
import { topState } from "../components/common/TopAtoms"
import { useRecoilState } from "recoil";

export default function Home() {
  const [teachers, setTeachers] = useRecoilState(topState);

  useEffect(() => {
    const teacherRef = collection(db, "TeacherUsers");
    const displayList = query(teacherRef, where("status", "==", true));

    getDocs(displayList).then(snapshot => {
     const teachers = snapshot.docs.map((doc) => {
        const id = doc.id;
        const name = doc.data().name;
        const title = doc.data().title;
        const category = doc.data().category;
        const subjects = doc.data().subjects;
        const method = doc.data().method;
        const status = doc.data().status;
        const consult = doc.data().consult;
        const photo_url = doc.data().photo_url;
         return { id, name, title, category, subjects, method, status, consult, photo_url };
      })
      setTeachers(teachers);
    })   
  }, [])

  return (
    <div>
      <Head>
        <title>Katekyo</title>
        <meta name="description" content="Katekyo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="bg-top-bg">
        <div className="flex max-w-5xl mx-auto">
          <TopLeftMenu />
          <div className="flex flex-wrap pt-10 ml-3">
            {teachers.map((teacher, index) => (
              <TopProfile key={index} teacher={teacher} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
