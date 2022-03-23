import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { db } from "../../../src/firabase";
import { teacherUserState } from "../../common/TeacherAtoms";

export default function CourseEditForm() {
    const [course, setCourse] = useState("");
    const [price, setPrice] = useState(0);
    const loginUser = useRecoilValue(teacherUserState);
    const [courseList, setCourseList] = useState([]);
    const [error, setError] = useState({ courseError: "", priceError: "" });
    
    useEffect(() => {
        const teacherRef = doc(db, "TeacherUsers", loginUser.id);
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

    const handleAddCourse = () => {
        if (course == "" && price == 0) {
            setError({
                courseError: "コース名を入力してください。",
                priceError:"値段を入力してください。",
            })
        } else if (course == "" && price !== 0) {
            setError({ 
                courseError: "コース名を入力してください。",
                priceError: "",
            })
        } else if (course !== "" && price == 0) {
            setError({ 
                courseError: "",
                priceError:"値段を入力してください。" ,
            })
        } else {
            setError({ 
                courseError: "",
                priceError: "",
            })
            // コースの追加
            const newCourse = { name: course, price: price }
            setCourseList([...courseList, newCourse])
            const teacherRef = doc(db, "TeacherUsers", loginUser.id);
            const courseRef = doc(collection(teacherRef, "courses"));
            setDoc(courseRef, newCourse)
            
            // 追加後の設定コース一覧を取得
            const NewCoursesRef = getDocs(collection(teacherRef, "courses"));
            NewCoursesRef.then(snapshot => {
            const courses = snapshot.docs.map((doc) => {
                const id = doc.id;
                const name = doc.data().name;
                const price = doc.data().price;
                return { id: id, name: name, price: price };
            })
            setCourseList(courses);

            // コースと値段の値をリセット
            setCourse("");
            setPrice(0);
            })
        }
    }

    const handleDeleteCourse = (id, index) => {
        const teacherRef = doc(db, "TeacherUsers", loginUser.id, "courses", id);
        deleteDoc(teacherRef);

        const NewTeacherRef = doc(db, "TeacherUsers", loginUser.id);
        const courseRef = getDocs(collection(NewTeacherRef, "courses"));
       
        // コース削除後の設定コース一覧を取得
        courseRef.then(snapshot => {
            const courses = snapshot.docs.map((doc) => {
                const id = doc.id;
                const name = doc.data().name;
                const price = doc.data().price;
                return { id: id, name: name, price: price };
            })
            setCourseList(courses);
        })
    }
    
    return (
        <>
        <label className="font-bold">コースと料金</label>
            <div>
                <div className="flex items-center">
                <div>
                    <input
                        onChange={(e) => (setCourse(e.target.value))}
                        className="w-80 my-2 px-2 py-1 border border-solid border-gray-300 rounded"
                        placeholder="コース名"
                        value={course}
                    ></input>
                </div>
                <div className="flex items-center">
                    <input
                        type="number"
                        onChange={(e) => (setPrice(e.target.value))}
                        className="w-20 my-2 ml-2 mr-1 px-2 py-1 border border-solid border-gray-300 rounded"
                        placeholder="料金"
                        value={price}
                    ></input>
                    円
                </div>
                <button 
                    onClick={handleAddCourse}
                    className="flex items-center h-8 bg-card-purple hover:bg-origin-deepPurple px-3 py-1 ml-2 rounded">
                    追加
                </button>
                </div>
                <div>
                    {error.priceError !== "" && (
                    <p className="text-red-500 text-xs pl-2 mt-3 mb-3">
                        {error.priceError}
                    </p>
                    )}
                      {error.courseError !== "" && (
                    <p className="text-red-500 text-xs pl-2 mt-3 mb-3">
                        {error.courseError}
                    </p>
                    )}
                </div>
               
                <div>
                    <ul>
                    {courseList.map((value, index) => (
                        <li key={index} className="py-1 flex items-center">
                        <p>{value.name} {value.price}円</p>
                        <img onClick={()=>handleDeleteCourse(value.id, index)} src="/close.png" className="h-4 w-4 ml-3" />
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        </>
    )
}