import Header from "../components/common/header/header";
import MyStudentProfileDetailCard from "../components/teacher/myStudentDetail/MyStudentProfileDetailCard"
import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import ShowProfileContent from "../components/teacher/myStudentDetail/ShowProfileContentBox";
import { useRouter } from "next/router";
import Router from "next/router";
import { useEffect, useState } from "react";
import { collection, doc, DocumentData, DocumentReference, getDoc, getDocs, query, QueryDocumentSnapshot, SnapshotOptions, where } from "firebase/firestore";
import { db } from "../src/firabase";
import { useRecoilValue } from "recoil";
import { teacherUserState } from "../components/common/TeacherAtoms";

export default function TopTeacherDetail() {
  const teacher = useRecoilValue(teacherUserState);
  const router = useRouter();
  const studentId = router.query.id;
  const [coursesList, setCoursesList] = useState([]);
  const [student, setStudent] = useState({});
  const [courses, setCourses] = useState([]);
  const [records, setRecords] = useState([]);
  const [photo_url, setPhoto_url] = useState([]);

  // type StudentUsers = {
  //   name: string;
  //   email: string;
  //   photo_url: string;
  //   flag: string;
  //   school: string;
  //   grade: string;
  //   text: string;
  //   goal: string;
  //   request: string;
  // }

  // const StudentUsersConverter = {
  //   toFirestore(user: StudentUsers): DocumentData {
  //     return {
  //       name: user.name, 
  //       email: user.email, 
  //       photo_url: user.photo_url, 
  //       flag: user.flag, 
  //       school: user.school, 
  //       grade: user.grade,
  //       text: user.text, 
  //       goal: user.goal,
  //       request: user.request
  //     };
  //   },
  //   fromFirestore(
  //     snapshot: QueryDocumentSnapshot,
  //     options: SnapshotOptions
  //   ): StudentUsers {
  //     const data = snapshot.data(options)!;

  //     return {
  //       name: data.name, 
  //       email: data.email, 
  //       photo_url: data.photo_url, 
  //       flag: data.flag, 
  //       school: data.school, 
  //       grade: data.grade,
  //       text: data.text, 
  //       goal: data.goal,
  //       request: data.request
  //     };;
  //   }
  // };


// const createdocument = <T = DocumentData>(collectionName: string, documentName: string) => {
//   return doc(db, collectionName, documentName) as DocumentReference<T>
// }

  useEffect(() => {
    // 生徒情報を取得
      // const test = doc(db, "StudentUsers", studentId).withConverter(StudentUsersConverter);
      const test = doc(db, "StudentUsers", studentId);
      const StudentRef = getDoc(test)
      StudentRef.then(snapshot => {
        if (snapshot.data()) {
          const studentId = snapshot.id;
          const student = snapshot.data();
          setStudent({studentId, student});
      }})
  },[])

  useEffect(() => {
    (async () => {
      // ログイン先生ユーザー担当コースを全て取得
      const coursesRef = collection(db, "Courses")
      const q = query(coursesRef, where("teacherID", "==", teacher.id));
      const coursesInfo = await getDocs(q).then((snapshot) => {
        const coursesArray = [];
        snapshot.docs.forEach((doc) => {
          const courseId = doc.id;
          const name = doc.data().name;
          const price = doc.data().price;
          coursesArray.push({ courseId, name, price })
        });
        return coursesArray;
      });

      setCoursesList(coursesInfo);
    })()
  },[student])

  useEffect(() => {
    (async () => {
    const courseListWithStudentInfo = await Promise.all(coursesList.map(async (course) => {
      const studentRef = doc(db,"Courses", course.courseId, "students", studentId);
      const studentInfo = await getDoc(studentRef).then((snapshot) => {
        return snapshot.data()
      });
      const courseId = course.courseId;
      const courseName = course.name;
      const coursePrice = course.price;

      return { courseId, courseName, coursePrice, studentInfo, studentId }
      
    }))
    setCourses(courseListWithStudentInfo)
  })()
  },[coursesList])

  // 生徒の受講履歴を取得
  useEffect(() => {
    const RecordsRef = collection(db, "Records");
    const q1 = query(RecordsRef, where("studentID", "==", studentId));
    const q2 = query(q1, where("teacherID", "==", teacher.id))
    getDocs(q2).then((snapshot) => {
      const records = snapshot.docs.map((doc) => {
        return doc.data();
      })
      setRecords(records);
    })
  },[courses]);

  // 生徒の写真データを取得
  useEffect(() => {
    (async() => {
      const studentRef = doc(db, "StudentUsers", studentId);
      const studentInfo = await getDoc(studentRef);
      const photo_url = studentInfo.data().photo_url;
      setPhoto_url(photo_url);
    })()
  },[records]);

  return (
    <>
      <Header />
      <div className="w-screen">
        <div className="flex max-w-6xl mx-auto py-10">
          <TeacherLeftMenu />
          <div className="max-w-3xl mx-auto">
            <p 
            onClick={() => Router.push("/myStudents")}
            className="text-gray-700 mb-5 underline cursor-pointer">
              生徒一覧に戻る
            </p>
            <div className="flex">
              <MyStudentProfileDetailCard student={student}  photo_url={photo_url}/>
              <ShowProfileContent courses={courses} student={student} records={records} setStudent={setStudent} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
