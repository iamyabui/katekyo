import { useSaveStudentProfile } from "../../hooks/useSaveStudentProfile";

export default function SaveButton() {

  const { handleSave } = useSaveStudentProfile();

  return (
    <>
      <button
        onClick={handleSave}
        className="bg-origin-gray hover:bg-origin-deepGray text-white px-5 py-1 rounded"
      >
        保存
      </button>
    </>
  );
}
