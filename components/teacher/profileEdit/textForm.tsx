import { useRecoilState } from "recoil";
import { editUserState } from "../../common/atoms";

export default function TextForm() {
  const [editUser, setEditUser] = useRecoilState(editUserState);

  const handleText = (e) => {
    setEditUser({ ...editUser, detail: e.target.value });
  };

  return (
    <div className="flex flex-col">
        <textarea
        className="
            form-control
            block
            w-full
            h-[300px]
            my-3
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            "
        value={editUser.detail}
        onChange={handleText}
        ></textarea>
    </div>
  );
}