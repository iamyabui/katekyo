export default function ConsultMethodCheckbox() {


  return (
    <>
      <label className="font-bold">相談方法</label>
      <div className="mt-2 ml-2 mb-5" >
        <div>
          <input
            type="checkbox"
            name="chat"
            value="chat"
            className="mr-2 border-gray-600"
          />
          チャット相談
        </div>
        <div>
          <input
            type="checkbox"
            name="video"
            value="video"
            className="mr-2 border-gray-600"
          />
          ビデオ相談
        </div>
      </div>
    </>
  );
}
