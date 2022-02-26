import Subject from "../buttons/subjects";

export default function SelectSubjects() {
  const subjects = [
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
