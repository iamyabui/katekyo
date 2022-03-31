import { useRecoilState, useRecoilValue } from "recoil";
import { editUserState, userState } from "../../common/atoms";

export default function TitleForm() {
  const [editUser, setEditUser] = useRecoilState(editUserState);

  const handleTitle = (e) => {
    setEditUser({ ...editUser, title: e.target.value });
  };

  return (
    <div className="mb-4 flex flex-col">
        <label className="font-bold">表示タイトル</label>
            <input
            className="form-control
            block
            w-96
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
            onChange={handleTitle}
            value={editUser.title}
          ></input>
    </div>
  );
}