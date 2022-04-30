import { useEffect, useState } from "react";
import { db, auth } from "../../src/firabase";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { studentUserState } from "../common/StudentAtoms";
import { teacherUserState } from "../common/TeacherAtoms";

export const UserAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacher, setTeacher] = useRecoilState(teacherUserState)
  const [student, setStudent] = useRecoilState(studentUserState)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const studentRef = doc(db, "StudentUsers", user.uid);
        const teacherRef = doc(db, "TeacherUsers", user.uid);

        getDoc(studentRef).then((snapshot) => {
          if (snapshot.data()) {
            const user = snapshot.data();
            setStudent({
              ...student,
              id: snapshot.id,
              email: user.email,
              flag: "student",
              name: user.name,
              school: user.school,
              grade: user.grade,
              text: user.text,
              goal: user.goal,
              request: user.request,
              photo_url: user.photo_url,
            });
          }
        });

        getDoc(teacherRef).then((snapshot) => {
          if (snapshot.data()) {
            const user = snapshot.data();
            setTeacher({
              ...teacher,
              id: snapshot.id,
              email: user.email,
              name: user.name,
              flag: "teacher",
              occupation: user.occupation,
              occupationName: user.occupationName,
              photo_url: user.photo_url,
            });
          }
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [setIsLoading]);

  return isLoading;
};
