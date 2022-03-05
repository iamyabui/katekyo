import Status from "../../common/buttons/StatusButton";

export default function MyClassContent() {
  return (
    <>
      <div className="flex justify-between h-20 w-full bg-blue-100 py-2 px-8 rounded mt-5">
        <div className="my-auto">
          <p>チャット相談/週1ビデオ相談（30分）</p>
          <p>松丸慎吾先生　3000円</p>
        </div>
        <div className="my-auto">
          <Status />
        </div>
      </div>
    </>
  );
}
