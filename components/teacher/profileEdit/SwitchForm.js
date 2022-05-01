import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { editUserState } from "../../common/atoms";

export default function SwitchForm() {
  const [editUser, setEditUser] = useRecoilState(editUserState);
  const handleSwitch = () => {
    editUser.status ? setEditUser({ ...editUser, status: false }) : setEditUser({ ...editUser, status: true });
  }

  return (
    <>
      <FormControl className="flex justify-between mt-5 text-center text-gray-700">
        <FormLabel htmlFor="switch">
          <p className="text-base font-bold">表示ステータス</p>
        </FormLabel>
        {editUser.status ? (
          <Switch id="switch" onChange={handleSwitch} value={editUser.status} isChecked />
        ) : (
          <Switch id="switch" onChange={handleSwitch} value={editUser.status} />
        )}
      </FormControl>
      <p className="text-sm w-52">
        先生一覧に表示する場合はON、表示しない場合はOFFにしてください。
      </p>
    </>
  );
}
