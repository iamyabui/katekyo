import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

export default function SwitchForm() {
  return (
    <>
      <FormControl className="flex justify-between mt-5 text-center text-gray-700">
        <FormLabel htmlFor="switch">
          <p className="text-base font-bold">表示ステータス</p>
        </FormLabel>
        <Switch id="switch" />
      </FormControl>
      <p className="text-sm w-52">
        先生一覧に表示する場合はON、表示しない場合はOFFにしてください。
      </p>
    </>
  );
}
