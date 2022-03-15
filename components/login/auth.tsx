import { useEffect, useState } from "react";
import { db, auth } from "../../src/firabase";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../common/atoms";

export const userAuth = () => {
  const [LoginUser, setLoginUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const studentRef = doc(db, "StudentUsers", user.uid);
        const teacherRef = doc(db, "TeacherUsers", user.uid);

        getDoc(studentRef).then((snapshot) => {
          if (snapshot.data()) {
            const user = snapshot.data();
            setLoginUser({
              ...LoginUser,
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
            setLoginUser({
              ...LoginUser,
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
  }, [setLoginUser]);

  return isLoading;
};
