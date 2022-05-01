import Router from "next/router";

export default function CancelButton() {

  const handleGoDetailPage = () => {
    Router.push("/myselfStudentDetail");
  };

  return (
    <>
      <button
        onClick={handleGoDetailPage}
        className="bg-origin-gray hover:bg-origin-deepGray text-white px-2 py-1 mr-3 rounded"
      >
        キャンセル
      </button>
    </>
  );
}