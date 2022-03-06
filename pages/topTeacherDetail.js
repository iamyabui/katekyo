import Header from "../components/common/header/header";
import TeacherProfileDetail from "../components/teacher/profileDetail/TeacherProfileDetailCard";
import Apply from "../components/top/teacherDetail/ApplyButton";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen">
        <div className="flex max-w-4xl m-auto py-10">
          <TeacherProfileDetail />
          <div className="flex-column mx-10 px-10 w-[40rem] bg-white p-8 rounded text-gray-700">
            <h1>全科目苦手克服方法を目指します！</h1>
            <div className="mt-5">
              <h1>自己紹介</h1>
              <p className="mt-2">
                東京大学3年生の松丸慎吾です。偏差値30から現役で東大に入学することができました！
                個人に合わせた勉強方法を一緒に考えて、希望大学に合わせて一緒に勉強しませんか？
                ご連絡お待ちしております！！
              </p>
            </div>
            <div className="mt-5">
              <h1>サポート内容</h1>
              <div className="mt-2">
                <div className="flex items-center mb-5">
                  <p className="mr-5">
                    ★チャット相談/週1ビデオ相談（30分）3000円
                  </p>
                  <Apply />
                </div>

                <div className="flex items-center  mb-5">
                  <p className="mr-5">
                    ★チャット相談/週1ビデオ相談（50分）5000円
                  </p>
                  <Apply />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
