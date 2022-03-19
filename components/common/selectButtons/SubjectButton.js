import { useState } from "react";

export default function Subject(props) {
  const { subject, index, selectedSubjects, setSelectedSubjects } = props;
  const normal = "inline-block bg-subject-gray hover:bg-origin-purple hover:text-white text-origin-purple px-1 my-1 mx-1 rounded hover:cursor-pointer"
  const selected = "inline-block bg-origin-purple text-white px-1 my-1 mx-1 rounded hover:cursor-pointer"
  // const [isActive, setIsActive] = useState(true)

  const handleStyleButton = (subject) => {
    // isActive ? (
    //     setIsActive(false)
    //   ) : (
    //     setIsActive(true)
    //   )
    if (selectedSubjects.includes(subject)) {
      console.log(selectedSubjects)
      const index = selectedSubjects.indexOf(subject)
      setSelectedSubjects(selectedSubjects.splice(index, 1))
     } else {
      console.log(selectedSubjects)
      setSelectedSubjects([...selectedSubjects, subject])
     }

    
  };

  return (
    <>
    {/* {selectedSubjects.includes(subject) ? ( */}
      <p key={index} onClick={() => handleStyleButton(subject)} className={selected}>
        {subject}
      </p>
    {/* ):(
      <p key={index} onClick={() => handleStyleButton(subject)} className={normal}>
        {subject}
      </p>
    )} */}
    </>
  );
}
