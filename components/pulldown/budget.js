export default function Budget() {
  const costArray = [
    "全て",
    "~1000円",
    "1000円~3000円",
    "3000円~5000円",
    "5000円~10000円",
    "10000円~15000円",
    "15000円~20000円",
    "20000円~25000円",
    "25000円~30000円",
  ];

  return (
    <div className="flex flex-col mb-5">
      <label className="py-2 font-bold">予算</label>
      <div className="inline-block relative w-32">
        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          {costArray.map((cost, index) => (
            <option key={index}>{cost}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
