import Cancel from "../buttons/cancel";
import Approve from "../buttons/approve";

export default function ShowProfileContent() {
  return (
    <div className="flex-column mx-10 w-[40rem] bg-white p-8 rounded text-gray-700">
      <div>
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
      </div>
      <div className="mt-10">
        <h1 className="mb-3 font-bold">申請中のコース</h1>
        <p>チャット相談/週1ビデオ相談（30分）3000円</p>
        <div className="flex justify-end mt-5">
          <Cancel />
          <Approve />
        </div>
      </div>
    </div>
  );
}
