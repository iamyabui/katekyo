import Header from '../components/common/header/header';
import TopTeacherProfileDetailCard from '../components/top/teacherDetail/TopTeacherProfileDetailCard';
// import DetailBox from "../components/top/teacherDetail/DetailBox";
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
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { studentUserState } from '../components/common/StudentAtoms';
import { useRecoilValue } from 'recoil';

export default function TopTeacherDetail() {
  const router = useRouter();
  const id = router.query.id;
  const [teacher, setTeacher] = useState({});
  const [courseList, setCourseList] = useState([]);
  const student = useRecoilValue(studentUserState);
  const [coursesStatus, setCoursesStatus] = useState([]);

  useEffect(() => {
    (async () => {
      const teacherRef = doc(db, 'TeacherUsers', id);

      const teacher = await getDoc(teacherRef).then((snapshot) => {
        if (snapshot.data()) {
          const user = snapshot.data();
          const teacherInfo = {
            id: snapshot.id,
            name: user.name,
            photo_url: user.photo_url,
            occupation: user.occupation,
            occupationName: user.occupationName,
            category: user.category,
            subjects: user.subjects,
            title: user.title,
            detail: user.detail,
            consult: user.consult,
          };
          setTeacher(teacherInfo);
          return { user, teacherInfo };
        }
      });

      console.log('teacher', teacher);

      const coursesRef = collection(db, 'Courses');
      const myCoursesRef = query(coursesRef, where('teacherID', '==', id));

      const coursesInfo = await getDocs(myCoursesRef).then((snapshot) => {
        const courses = snapshot.docs.map((doc) => {
          const id = doc.id;
          const name = doc.data().name;
          const price = doc.data().price;
          return { id: id, name: name, price: price };
        });
        return courses;
      });
      setCourseList(coursesInfo);

      console.log('corces', coursesInfo);

      // 該当courseIDを取得できたら、またCoursesコレクションから該当courseID＞生徒コレクション内情報を取得
      getDocs(myCoursesRef).then((snapshot) => {
        snapshot.docs.map((courseDoc) => {
          // ログイン先生ユーザ担当コースを受講した生徒を全て取得
          const courseId = courseDoc.id;
          const allStudentsRef = collection(
            db,
            'Courses',
            courseId,
            'students'
          );
          console.log(allStudentsRef);
          // const studentRef = (async function() {
          //   await getDoc(doc(db, "Courses", courseId, "students", student.id));
          // })();
          // console.log(studentRef.data());

          // 担当コース受講生徒の中から、指定した生徒が受講したもしくは受講済のコース内容と生徒の情報を取得
          getDocs(allStudentsRef).then((snapshot) => {
            console.log(snapshot.docs);
            const courses = snapshot.docs
              .map((studentDoc) => {
                console.log(studentDoc.data());
                const id = studentDoc.id;
                const studentRef = studentDoc.data();
                // if (id == student.id) {
                return { ...studentRef, courseId };
                // }
              })
              .filter(Boolean);
            console.log(courses);
            setCoursesStatus(courses);
          });
        });
      });
    })();
  }, []);

  return (
    <>
      {/* {console.log(coursesStatus)} */}
      <Header />
      <div className='bg-top-bg h-screen'>
        <div className='flex max-w-4xl m-auto py-10'>
          <TopTeacherProfileDetailCard teacher={teacher} />
          <div className='flex-column mx-10 px-10 w-[40rem] text-gray-700'>
            {/* <DetailBox teacher={teacher} /> */}

            <div className='mb-5 flex-column p-5'>
              <p className='font-bold'>{teacher.title}</p>
            </div>
            <p className='mb-5 ml-2'>自己紹介</p>
            <div className='mb-5 flex-column bg-white p-5 rounded '>
              <p className='whitespace-pre-wrap text-sm'>{teacher.detail}</p>
            </div>

            <p className='mb-5 ml-2'>コース内容</p>
            <div className='mb-5 flex-column bg-white p-5 rounded '>
              <Table>
                <Thead>
                  <Tr>
                    <Th>コース名</Th>
                    <Th>値段</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {courseList.map((value, index) => (
                    <Tr key={index}>
                      <Th>{value.name}</Th>
                      <Th>{value.price}円</Th>
                      <Th>
                        {student.id !== '' && (
                          <Apply courseName={value.name} courseId={value.id} />
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