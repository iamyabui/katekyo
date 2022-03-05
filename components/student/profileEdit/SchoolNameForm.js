export default function School() {
  return (
    <form>
      <div>
        <label className="block text-gray-700 text-base mb-2" htmlFor="name">
          学校名
        </label>
        <input
          className="w-40 h-9 appearance-none block bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white"
          id="name"
          type="text"
          placeholder=""
        />
        {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
    </form>
  );
}
