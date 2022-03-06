export default function Subject(props) {
  const { subject } = props;

  return (
    <>
      <p className="inline-block bg-subject-gray hover:bg-origin-purple hover:text-white text-origin-purple px-1 my-1 mx-1 rounded">
        {subject}
      </p>
    </>
  );
}
