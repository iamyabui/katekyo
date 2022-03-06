import TeacherLeftMenu from "../components/teacher/common/TeacherLeftMenu";
import TeacherProfileDetail from "../components/teacher/profileDetail/TeacherProfileDetailCard";
import Edit from "../components/common/buttons/EditButton";
import Header from "../components/common/header/header";

export default function MyselfTeacherDetail() {
  return (
    <div>
      <Header />
      <div className="bg-top-bg h-screen w-screen ">
        <div className="flex max-w-7xl mx-auto py-10">
          <TeacherLeftMenu />
          <TeacherProfileDetail />
          <div className="flex-column mx-10 px-10 w-[40rem] bg-white p-8 rounded text-gray-700">
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
    </div>
  );
}
