import { useRecoilState } from "recoil";
import { editUserState } from "../atoms";
import Subject from "./SubjectButton";

export default function SelectSubjects() {
  const [editUser, setEditUser] = useRecoilState(editUserState);

  const subjects = [
    "#英語",
    "#算数",
    "#国語",
    "#理科",
    "#社会",
    "#数学",
    "#化学",
    "#物理",
    "#生物",
    "#現代社会",
    "#世界史",
    "#日本史",
    "#歴史",
    "#地理",
    "#現代文",
    "#古典",
    "#漢文",
  ];

  return (
    <>
      {subjects.map((subject, index) => (
          <Subject subject={subject} key={index} />          
      ))}
    </>
  );
}
