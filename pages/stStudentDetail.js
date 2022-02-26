import Header from "../components/common/header";
import StudentLeftMenu from "../components/common/studentLeftMenue";
import StudentProfileDetail from "../components/cards/studentProfileDetail";
import Edit from "../components/buttons/edit";

export default function TopTeacherDetail() {
  return (
    <>
      <Header />
      <div className="bg-top-bg h-screen w-screen">
        <div className="flex max-w-5xl mx-auto py-10">
          <StudentLeftMenu />
          <StudentProfileDetail />
          <div className="flex-column mx-10 w-[30rem]">
            <p>自己紹介</p>
            <p>
              桜学院の山田です。 部活はバトン部に所属していました。
              BTSやTWICEなどのKPOPが好きです！
            </p>
            <p>目標</p>
            <p>
              早稲田大学の工学部を目指しています。
              夏までに、過去問が解けるようになっていたいです。
            </p>
            <p>先生への要望</p>
            <p>
              物理が苦手なので、苦手克服をサポートいただけると嬉しいです。物理が苦手なので、苦手克服をサポートいただけると嬉しいです。
            </p>
            <div className="mt-10 flex justify-end">
              <Edit />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
