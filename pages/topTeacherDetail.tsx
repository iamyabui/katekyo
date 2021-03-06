import Header from '../components/common/header/header';
import TopTeacherProfileDetailCard from '../components/top/teacherDetail/TopTeacherProfileDetailCard';
import Apply from '../components/top/teacherDetail/ApplyButton';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../src/firabase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { studentUserState } from '../components/common/StudentAtoms';
import { useRecoilValue } from 'recoil';
import { user } from '../components/common/TeacherAtoms';

export default function TopTeacherDetail() {
  const router = useRouter();
  const id = router.query.id;
  const [teacher, setTeacher] = useState<user>({
      id: "",
      email: "",
      flag: "",
      name: "",
      status: false,
      photo_url: "",
      occupation: "",
      occupationName: "",
      category: "",
      subjects: [],
      title: "",
      detail: "",
      consult: { video: false, chat: false },
  });
  const [courseList, setCourseList] = useState([]);
  const student = useRecoilValue(studentUserState);
  const [loginStudentStatus, setLoginStudentStatus] = useState([]);
  const [countRecords, setCountRecords] = useState(0);

  type student = {
    apply_date:any;
    finish_date:any;
    start_date:any;
    status: string;
    studentId: string;
  }

  // ①コース情報を各コースオブジェクト毎に配列で取得。
  useEffect(() => {
    (async () => {
      if(typeof id == "string") {
      const teacherRef = doc(db, 'TeacherUsers', id);

      const teacherInfo = await getDoc(teacherRef).then((snapshot) => {
        const id = snapshot.id;
        const { name, email, photo_url, occupation, occupationName, category,subjects, title, detail, consult, flag, status } = snapshot.data();
        return { id, name, email, photo_url, occupation, occupationName, category, subjects, title, detail, consult, flag, status }
      });
      setTeacher(teacherInfo);

      const coursesRef = collection(db, 'Courses');
      const myCoursesRef = query(coursesRef, where('teacherID', '==', id));

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
    })();
  }, []);

  // ②各コースについて、コース名、値段、コースID、ログイン生徒ユーザーの受講状況をオブジェクトで取得。
  useEffect(() => {
    (async() => {
    const courseListWithStudentInfo =  await Promise.all(courseList.map(async (course) => {

      // 先生idで絞ったコース、１コースに対しての受講生徒情報を取得
      const allStudentsRef = collection(db, 'Courses', course.id, 'students');
      const q = query(allStudentsRef);
      const courseStudents = await getDocs(q);

      // courseWithStudentsArray：
      // 上記で取得した受講生徒一人ずつの情報(複数）と、コース情報（１）をオブジェクトとして取得
      // 受講生徒分作成し、配列に格納している
      const courseWithStudentsArray = courseStudents.docs.map((doc) => {
        const studentId = doc.id;
        return { ...doc.data(), studentId }
      });

      // ログイン生徒ユーザーのオブジェクトを取得。
      const loginStudentRef:any = courseWithStudentsArray.find(function (value) {
          return value.studentId == student.id
      })

      if (loginStudentRef == undefined || loginStudentRef.status == "終了") {
        return { courseId: course.id, name: course.name, price: course.price, status: "undefined" }
      } else {
        return { courseId: course.id, name: course.name, price: course.price, status: loginStudentRef.status }
       }

    }));

    setLoginStudentStatus(courseListWithStudentInfo);
    })();
  }, [courseList]);

  // ③実績数を取得
  useEffect(() => {
    (async () => {
      const RecordsRef = collection(db, 'Records');
      const q = query(RecordsRef, where("teacherID", "==", id));
      const records = await getDocs(q);
      const count = records.docs.length;
      setCountRecords(count);
    })()
  }, [courseList])


  return (
    <>
      <Header />
      <div>
        <div className='flex max-w-4xl m-auto py-10'>
          <TopTeacherProfileDetailCard teacher={teacher} countRecords={countRecords} />
          <div className='flex-column mx-10 px-10 w-[40rem] text-gray-700'>

            <div className='mb-5 flex-column p-5'>
              <p className='font-bold'>{teacher.title}</p>
            </div>
            <p className='mb-5 ml-2 font-bold text-sm'>自己紹介</p>
            <div className='mb-5 flex-column bg-white p-5 rounded '>
              <p className='whitespace-pre-wrap text-sm'>{teacher.detail}</p>
            </div>

            <p className='mb-5 ml-2 font-bold text-sm'>コース内容</p>
            <div className='mb-5 flex-column bg-white p-5 rounded '>
              <Table>
                <Thead>
                  <Tr>
                    <Th className="w-[250px]">コース名</Th>
                    <Th>値段</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loginStudentStatus.map((value, index) => (
                    <Tr key={index}>
                      <Th>{value.name}</Th>
                      <Th>{value.price}円</Th>
                      <Th>
                      {student.id !== "" && (
                        value.status == "undefined" ? (
                          <Apply key={index} courseName={value.name} courseId={value.courseId} coursePrice={value.price} teacherId={id} teacherEmail={teacher.email} setCourseList={setCourseList} />
                        ) : (
                          <p>{value.status}</p>
                        )
                      )}
                      </Th>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}