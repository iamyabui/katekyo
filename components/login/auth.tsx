import { useEffect, useState } from "react";
import { db, auth } from "../../src/firabase";
import { doc, getDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { userState } from "../common/atoms";

export const userAuth = () => {
  const [LoginUser, setLoginUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const docRef = doc(db, "StudentUsers", user.uid);

        getDoc(docRef).then((snapshot) => {
          const user = snapshot.data();
          setLoginUser({
            ...LoginUser,
            id: snapshot.id,
            email: user.email,
            flag: user.flag,
            name: user.name,
            school: user.school,
            grade: user.grade,
            text: user.text,
            goal: user.goal,
            request: user.request,
            photo_url: user.photo_url,
          });
        });
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [setLoginUser]);

  return isLoading;
};
