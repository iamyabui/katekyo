import { useRecoilState } from "recoil";
import { subjectsState } from "../../common/TopAtoms";

export default function Subject(props) {
  const { subject, index } = props;
  const [checkSubjects, setCheckSubjects] = useRecoilState(subjectsState);

  const normal = "inline-block bg-subject-gray hover:bg-origin-purple hover:text-white text-origin-purple px-1 my-1 mx-1 rounded hover:cursor-pointer"
  const selected = "inline-block bg-origin-purple text-white px-1 my-1 mx-1 rounded hover:cursor-pointer"

  const handleStyleButton = (subject) => {
    if (checkSubjects.includes(subject)) {
      const index = checkSubjects.indexOf(subject)
      const NewSubjects = [...checkSubjects]
      NewSubjects.splice(index, 1)
      setCheckSubjects([...NewSubjects])
     } else {
      setCheckSubjects([...checkSubjects, subject])
     }
  };

  return (
    <>
    {checkSubjects.includes(subject) ? (
      <p key={index} onClick={() => handleStyleButton(subject)} className={selected}>
        {subject}
      </p>
     ):(
      <p key={index} onClick={() => handleStyleButton(subject)} className={normal}>
        {subject}
      </p>
    )}
    </>
  );
}
