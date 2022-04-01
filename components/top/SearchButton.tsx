import { collection, getDocs, query, where } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../src/firabase";
import { categoryState, consultState, highestBudgetState, lowestBudgetState, subjectsState, topState } from "../common/TopAtoms";

export default function SearchButton() {
    const [test, setTeachers] = useRecoilState(topState);
    const category = useRecoilValue(categoryState);
    const subjects = useRecoilValue(subjectsState);
    const consult = useRecoilValue(consultState);
    const lowestCost = useRecoilValue(lowestBudgetState);
    const highestCost = useRecoilValue(highestBudgetState);

    const handleFilter = () => {
        const teacherRef = collection(db, "TeacherUsers");
        const displayList = query(teacherRef, where("status", "==", true));
        const coursesRef = collection(db, "Courses");

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
            return { id, name, title, category, subjects, method, status, consult }
        })
        
        if(category !== "" ){
            const categoryFilter = teachers.filter(function (teacher) {
                return teacher.category == category;
            })

            if(consult.chat == false && consult.video == false){
                const consultFilter = categoryFilter.filter(function (teacher) {
                    if(teacher.consult.chat == true && teacher.consult.video == false) {
                        return teacher.consult.chat == true 
                    } else if (teacher.consult.chat == false && teacher.consult.video == true) {
                        return teacher.consult.video == true
                    } else if (teacher.consult.chat == true && teacher.consult.video == true) {
                        return teacher.consult.chat == true && teacher.consult.video == true 
                    }
                })
                setTeachers(consultFilter);
            }
            // 教科フィルター
            // const add_subjectFilter = subjects.map((subject) => {
            //     const test = categoryFilter.map((teacher) => {
            //         const mySubjects = teacher.subjects;
            //         console.log(teacher.id)
            //         if (mySubjects.includes(subject)) {
            //             console.log(teacher)
            //             return teacher;
            //         }
            //     }).filter(Boolean);
            //     console.log(test)
            // })
            // console.log(add_subjectFilter);    
            
            } else {

                // 相談方法フィルター
                // if(consult.chat == true || consult.video == true){
                //     console.log("test")
                //     const consultFilter = teachers.filter(function (teacher) {
                //         if(consult.chat == true && consult.video == true) {
                //             return teacher.consult.chat == true && teacher.consult.video == true; 
                //         } else if (consult.chat == true) {
                //             return teacher.consult.chat == true
                //         } else if (consult.video == true) {
                //             return teacher.consult.video == true
                //         }
                //     })
                //     setTeachers(consultFilter);
                // }else{
                //     setTeachers(teachers);
                // }

                // 予算フィルター
                if(lowestCost !== null || highestCost !== null){
                    getDocs(coursesRef).then(snapshot => {
                        const courses = snapshot.docs.map((doc) => {
                            const courseID = doc.id;
                            const teacherID = doc.data().teacherID;
                            const price = doc.data().price;
                            return { courseID, teacherID, price };
                        })

                        console.log(courses);

                        const budgetFilter = courses.filter((course) => {
                            // return course.price > 8000;
                            if(lowestCost !== null && highestCost == null) {
                                console.log(lowestCost)
                                return course.price > lowestCost;
                            } else if (lowestCost == null && highestCost !== null){
                                return course.price < 7000;
                            } else if (lowestCost !== null && highestCost !== null){
                                return course.price > lowestCost && course.price < highestCost;
                            }
                        })

                        // 予算フィルターをmapで試したもの
                        // const budgetFilter = courses.map((course) => {
                        //     console.log(course)
                        //     if(lowestCost !== null && highestCost == null) {
                        //             console.log(lowestCost)
                        //             if(course.price > 7000){
                        //                 return course
                        //             }
                        //         } else if (lowestCost == null && highestCost !== null){
                        //             return course.price < 7000;
                        //         } else if (lowestCost !== null && highestCost !== null){
                        //             return course.price > lowestCost && course.price < highestCost;
                        //         }
                        // })

                        console.log(budgetFilter);


                        })
                    
                }
            }
        
        })
        
        
    }
    
    return (
      <>
        <button 
        onClick={()=>handleFilter()}
        className="
            mx-auto 
            border-indigo-200
            text-origin-purple 
            border
            border-origin-purple
            hover:bg-origin-purple 
            hover:text-white 
            px-1 
            w-32 
            h-10 
            rounded">
          検索
        </button>
      </>
    );
  }