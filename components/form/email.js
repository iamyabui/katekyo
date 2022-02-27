export default function Email() {
  return (
    <>
      <label className="block text-gray-700 text-base mb-2" htmlFor="name">
        メールアドレス
      </label>
      <input
        className="w-full h-9 appearance-none border border-gray-300 block rounded py-3 px-4 mb-3 focus:outline-none"
        id="name"
        type="text"
        placeholder=""
      />
      {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
    </>
  );
}
