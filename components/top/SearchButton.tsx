import { collection, getDocs, query, where } from "firebase/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import { db } from "../../src/firabase";
import { categoryState, consultState, highestBudgetState, lowestBudgetState, subjectsState, topState } from "../common/TopAtoms";

export default function SearchButton() {
    const [teachers, setTeachers] = useRecoilState(topState);
    const category = useRecoilValue(categoryState);
    const subjects = useRecoilValue(subjectsState);
    const consult = useRecoilValue(consultState);
    const lowestCost = useRecoilValue(lowestBudgetState);
    const highestCost = useRecoilValue(highestBudgetState);

    const handleFilter = () => {
        (async() => {
            const teacherRef = collection(db, "TeacherUsers");
            const displayList = query(teacherRef, where("status", "==", true));

            const resetFilter = await getDocs(displayList).then(snapshot => {
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
            return teachers
            })

        // 科目のフィルター
        function subjectFilter() {
            if (subjects.length !== 0){
                // filteredSubjects: 選択した科目に該当する先生を出力。
                const filteredSubjects = subjects.map((subject) => {
                    const checkInclude = resetFilter.filter(function (teacher) {
                        return teacher.subjects.includes(subject)
                    })
                    return checkInclude
                })

                // 複数選択されていた場合に、一つでも合致しない教科があるか確認。（もし、合致しない場合は、条件に当てはまらないとしてから配列を後で返すため。）
                const test3 = filteredSubjects.map((value) => {
                    if (value.length == 0) {
                        return "NG"
                    }else{
                        return "OK"
                    }
                })

                // もしひとつでも合致しなかった科目がある場合は、から配列を返す。
                // 合致した場合は、最初に出力したフィルター結果を返す。
                if (test3.includes("NG")) {
                    return [];
                } else {
                    return filteredSubjects[0];
                }
            } else {
                return resetFilter;
            }

        }

        // カテゴリのフィルター
        function categoryFilter(filter1st) {
            if(category !== "" ){
                const categoryFilter = filter1st.filter(function (teacher) {
                    return teacher.category == category;
                })
                return categoryFilter;
            }else{
                return filter1st;
            }
        }

        // 相談方法のフィルター
        function consultFilter(filter2nd) {
            if(consult.chat !== false || consult.video !== false){

            const consultFilter = filter2nd.filter(function (teacher) {
                if(consult.chat == true && consult.video == false) {
                    return teacher.consult.chat == true 
                } else if (consult.chat == false && consult.video == true) {
                    return teacher.consult.video == true
                } else if (consult.chat == true && consult.video == true) {
                    return teacher.consult.chat == true && teacher.consult.video == true 
                }
            })
            return consultFilter;
            }else{
                return filter2nd;
            }
        }


        // 予算（上限と下限）のフィルター
        function budgetFilter (filter3rd) {
            if(lowestCost !== "" || highestCost !== ""){
                // 一旦Coursesコレクションから全てのコースIDと値段、先生IDを取得する
                const coursesRef = collection(db, "Courses");
                getDocs(coursesRef).then(snapshot => {
                    const courses = snapshot.docs.map((doc) => {
                        const courseID = doc.id;
                        const teacherID = doc.data().teacherID;
                        const price = doc.data().price;
                        return { courseID, teacherID, price };
                    })


                    // 取得したCoursesコレクションに対して、上限と下限フィルターを実施
                    const budgetFilter = courses.filter((course) => {
                        if(lowestCost !== "" && highestCost == "") {
                            return course.price >= Number(lowestCost);
                        } else if (lowestCost == "" && highestCost !== ""){
                            return course.price <= Number(highestCost);
                        } else if (lowestCost !== "" && highestCost !== ""){
                            return course.price >= Number(lowestCost) && course.price <= Number(highestCost);
                        }
                    })
    
                    // フィルター後、予算に合致したコースを持っている先生のIDだけ、配列で結果として取得する
                    const filteredTeachersList = budgetFilter.map((course) => {
                        return course.teacherID;
                    })
    
                    // 上で取得した配列を重複削除
                    const filteredTeacherArray = filteredTeachersList.filter(function(value, i, course) {
                        return i == course.indexOf(value);
                    })

                    // 最後に、カテゴリフィルターと相談フィルターが終わった結果から、予算フィルターをかける
                    const result = filteredTeacherArray.map((teacherId) => {
                        const id = filter3rd.find(teacher => {
                            return teacher.id == teacherId;
                        })
                        return id;
                    }).filter(Boolean);

                    setTeachers(result)
    
                })
                
            }else{
                setTeachers(filter3rd)
            }
            

        }
       

        const filter1st = await subjectFilter();
        if (filter1st !== []){
        const filter2nd = await categoryFilter(filter1st);
        const filter3rd = await consultFilter(filter2nd);
        await budgetFilter(filter3rd);
        }else{
            await setTeachers([]);
        }
        
    })()

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