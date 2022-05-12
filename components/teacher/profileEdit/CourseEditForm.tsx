import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
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
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState("");
    
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

            if( isEdit == true ) {
                // 該当コースの編集
                // TeacherUsersコレクション内該当coursesコレクションの該当ドキュメント更新
                const teacherRef = doc(db, "TeacherUsers", loginUser.id, "courses", editId);
                updateDoc(teacherRef, {
                    name: course, 
                    price: price,
                });
                // Coursesコレクション内該当CourseIDドキュメント更新
                const courseRef = doc(db, "Courses", editId);
                updateDoc(courseRef, {
                    name: course, 
                    price: price,
                })
                setIsEdit(false);

            } else {
                // 先生コレクション内サブコレクションにてコースの追加
                const newCourse = { name: course, price: price }
                // setCourseList([...courseList, newCourse])
                const teacherRef = doc(db, "TeacherUsers", loginUser.id);
                const courseRef = collection(teacherRef, "courses");
                addDoc(courseRef, newCourse).then(snapshot => {
                    // Coursesコレクションに先程追加したコースIDを登録
                    const coursesRef = doc(db, "Courses", snapshot.id);
                    setDoc(coursesRef, {
                        name: course, price: price, teacherID: loginUser.id  
                    })
                })
            }            

            // 編集追加後の設定コース一覧を取得
            const teacherRef = doc(db, "TeacherUsers", loginUser.id);
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

    const handleDeleteCourse = (id) => {
        (async () => {
            const studentsWithCourse = await getDocs(collection(db, "Courses", id, "students"));
            const studentsCount = studentsWithCourse.docs.length;
        
            if(studentsCount == 0){
                const teacherRef = doc(db, "TeacherUsers", loginUser.id, "courses", id);
                deleteDoc(teacherRef);

                const courseRef = doc(db, "Courses", id)
                deleteDoc(courseRef);

                const NewTeacherRef = doc(db, "TeacherUsers", loginUser.id);
                const NewCoursesRef = getDocs(collection(NewTeacherRef, "courses"));
            
                // コース削除後の設定コース一覧を取得
                NewCoursesRef.then(snapshot => {
                    const courses = snapshot.docs.map((doc) => {
                        const id = doc.id;
                        const name = doc.data().name;
                        const price = doc.data().price;
                        return { id: id, name: name, price: price };
                    })
                    setCourseList(courses);
                })

                setCourse("");
                setPrice(0);
                setEditId("");
                setIsEdit(false);
            }else{
                alert("受講している生徒がいるため削除することはできません。")
            }
            
        })()
    }

    const handleEditCourse = (course) => {
        (async () => {
            const studentsWithCourse = await getDocs(collection(db, "Courses", course.id, "students"));
            const studentsCount = studentsWithCourse.docs.length;

            if(studentsCount == 0){
                setCourse(course.name);
                setPrice(course.price);
                setEditId(course.id);
                setIsEdit(true);
            }else{
                alert("受講している生徒がいるためコース名を変更することはできません。")
            }
        })()
            
    }
    
    return (
        <>
        <label className="font-bold">コースと料金</label>
            <div className="text-sm">
                <div className="flex items-center">
                <div>
                    <input
                        onChange={(e) => (setCourse(e.target.value))}
                        className="w-[250px] my-2 px-2 py-1 border border-solid border-gray-300 rounded"
                        placeholder="コース名"
                        value={course}
                    ></input>
                </div>
                <div className="flex items-center">
                    <input
                        type="number"
                        onChange={(e) => (setPrice(Number(e.target.value)))}
                        className="w-16 my-2 ml-2 mr-1 px-2 py-1 border border-solid border-gray-300 rounded"
                        placeholder="料金"
                        value={price}
                    ></input>
                    円
                </div>
                <button 
                    onClick={handleAddCourse}
                    className="flex items-center h-8 w-[50px] bg-card-purple hover:bg-origin-deepPurple px-1 py-1 ml-2 rounded">
                    <p className="mx-auto">{ isEdit ? "保存" : "追加" }</p>
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
                    <Table size='sm' w={400} >
                    <Thead>
                        <Tr>
                        <Th>コース名</Th>
                        <Th>値段</Th>
                        <Th></Th>
                        <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {courseList.map((course, index) => (
                            <Tr key={index}>
                            <Td>{course.name}</Td>
                            <Td>{course.price}円</Td>
                            <Td><img onClick={()=>handleDeleteCourse(course.id)} src="/trash.png" className="h-4 w-4 ml-3 hover:cursor-pointer" /></Td>
                            <Td><img onClick={()=>handleEditCourse(course)} src="/edit.png" className="h-4 w-4 ml-3 hover:cursor-pointer" /></Td>
                            </Tr>
                        ))}
                        
                    </Tbody>
                    </Table>
                    </ul>
                </div>
            </div>
        </>
    )
}