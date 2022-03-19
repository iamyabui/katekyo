import Router from "next/router";

export default function Edit() {
  const handleGoEditPage = () => {
    Router.push("/myselfTeacherEdit");
  };

  return (
    <>
      <button
        onClick={handleGoEditPage}
        className="bg-origin-gray hover:bg-origin-deepGray text-white px-5 py-1 rounded"
      >
        編集
      </button>
    </>
  );
}
