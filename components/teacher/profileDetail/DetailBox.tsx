import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { teacherUserState } from "../../common/TeacherAtoms";
import Edit from "./EditButton";

export default function DetailBox() {
  const teacher = useRecoilValue(teacherUserState);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const teacherRef = doc(db, "TeacherUsers", teacher.id);
    const courseRef = getDocs(collection(teacherRef, "courses"));

    courseRef.then(snapshot => {
        const courses = snapshot.docs.map((doc) => {
            const id = doc.id
            const name = doc.data().name;
            const price = doc.data().price;
            return { id: id, name: name, price: price }
        })
        setCourseList(courses);
    })
}, [])

    return(
        <div className="mx-10 w-[40rem] text-gray-700">
        <p className="whitespace-pre-wrap text-base font-bold mb-5">{teacher.title}</p>
        <p className="mb-5 ml-2 text-sm font-bold">自己紹介</p>
        <div className="mb-5 flex-column bg-white p-5 rounded ">
          <p className="whitespace-pre-wrap text-sm">{teacher.detail}</p>
        </div>
  
        <p className="mb-5 ml-2 text-sm font-bold">コース内容</p>
        <div className="mb-5 flex-column bg-white p-5 rounded ">
          <ul>
          {courseList.map((value, index) => (
              <li key={index} className="py-1 flex items-center">
              <p className="whitespace-pre-wrap text-sm">{value.name} {value.price}円</p>
              </li>
          ))}
          </ul>
        </div>
  
  
        <div className="mt-10 flex justify-end">
          <Edit />
        </div>
        </div>
        
    );
}