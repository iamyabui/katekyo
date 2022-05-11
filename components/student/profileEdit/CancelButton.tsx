import Router from "next/router";
import { useRecoilState } from "recoil";
import { errorState } from "../../common/atoms";

export default function CancelButton() {
  const [error, setError] = useRecoilState(errorState);

  const handleGoDetailPage = () => {
    setError({...error, 
      nameError: "", 
      gradeError: ""
    })
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