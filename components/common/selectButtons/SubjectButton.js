import { useRecoilState } from "recoil";
import { editUserState } from "../atoms";

export default function Subject(props) {
  const { subject, index } = props;
  const [editUser, setEditUser] = useRecoilState(editUserState);

  const normal = "inline-block bg-subject-gray hover:bg-origin-purple hover:text-white text-origin-purple px-1 my-1 mx-1 rounded hover:cursor-pointer"
  const selected = "inline-block bg-origin-purple text-white px-1 my-1 mx-1 rounded hover:cursor-pointer"
  const test = editUser.subjects;

  const handleStyleButton = (subject) => {
    if (editUser.subjects.includes(subject)) {
      const index = editUser.subjects.indexOf(subject)
      const NewSubjects = [...editUser.subjects]
      NewSubjects.splice(index, 1)
      setEditUser({...editUser, subjects: NewSubjects})
     } else {
      setEditUser({ ...editUser, subjects: [...editUser.subjects, subject] })
     }
  };

  return (
    <>
    {editUser.subjects.includes(subject) ? (
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
