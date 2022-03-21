import Header from "../components/common/header/header";
import TopTeacherProfileDetailCard from "../components/top/teacherDetail/TopTeacherProfileDetailCard";
import Apply from "../components/top/teacherDetail/ApplyButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../src/firabase";
import { doc, getDoc } from "firebase/firestore";

export default function TopTeacherDetail() {
  const router = useRouter();
  const id = router.query.id;
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
  const teacherRef = doc(db, "TeacherUsers", id);

    getDoc(teacherRef).then((snapshot) => {
      if (snapshot.data()) {
        const user = snapshot.data();
        console.log(user)
        setTeacher({
          name: user.name,
          photo_url: user.photo_url,
          occupation: user.occupation,
          occupationName: user.occupationName,
          category: user.category,
          subjects: user.subjects,
          title: user.title,
          detail: user.detail,
          consult: user.consult,
        });
      }
    });
  }, [setTeacher]);

  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen">
        <div className="flex max-w-4xl m-auto py-10">
          <TopTeacherProfileDetailCard teacher={teacher}/>
          <div className="flex-column mx-10 px-10 w-[40rem] bg-white p-8 rounded text-gray-700">
            <h1>{teacher.title}</h1>
            <div className="mt-5">
              <h1>自己紹介</h1>
              <p className="mt-2">
                東京大学3年生の松丸慎吾です。偏差値30から現役で東大に入学することができました！
                個人に合わせた勉強方法を一緒に考えて、希望大学に合わせて一緒に勉強しませんか？
                ご連絡お待ちしております！！
              </p>
            </div>
            <div className="mt-5">
              <h1>サポート内容</h1>
              <div className="mt-2">
                <div className="flex items-center mb-5">
                  <p className="mr-5">
                    ★チャット相談/週1ビデオ相談（30分）3000円
                  </p>
                  <Apply />
                </div>

                <div className="flex items-center  mb-5">
                  <p className="mr-5">
                    ★チャット相談/週1ビデオ相談（50分）5000円
                  </p>
                  <Apply />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
