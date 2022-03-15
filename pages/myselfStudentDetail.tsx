import Header from "../components/common/header/header";
import StudentProfileDetailCard from "../components/student/profileDetail/StudentProfileDetailCard";
import StudentLeftMenu from "../components/student/common/StudentLeftMenu";
import ProfileContentBox from "../components/student/profileDetail/ProfileContentBox";
import { useRecoilValue } from "recoil";
import { userState } from "../components/common/atoms";
import { useState, useEffect } from "react";
import Router from "next/router";

export default function TopTeacherDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const loginUser = useRecoilValue(userState);
  const userId = loginUser.id;

  useEffect(() => {
    // ログインユーザを確認し、ログインできてなかったらLoginページへ遷移する。
    userId == "" && Router.push("/login");
    setIsLoading(false);
  }, []);

  return (
    <>
      {(isLoading || userId) && (
        <>
          <Header />
          <div className="bg-top-bg h-screen w-screen">
            <div className="flex max-w-5xl mx-auto py-10">
              <StudentLeftMenu />
              <StudentProfileDetailCard />
              <ProfileContentBox />
            </div>
          </div>
        </>
      )}
    </>
  );
}
