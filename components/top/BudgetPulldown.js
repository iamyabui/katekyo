import { useRecoilState } from "recoil";
import { highestBudgetState, lowestBudgetState } from "../common/TopAtoms";

export default function Budget() {
  const [lowestCost, setLowestCost] = useRecoilState(lowestBudgetState);
  const [highestCost, setHighestCost] = useRecoilState(highestBudgetState);

  const lowestCostArray = [
    { display: "-", value: null },
    { display: 1000 , value: 1000 },
    { display: 3000 , value: 3000 },
    { display: 5000 , value: 5000 },
    { display: 7000 , value: 7000 },
    { display: 10000 , value: 10000 },
  ];
  
  const highestCostArray = [
    { display: "-", value: null },
    { display: 3000 , value: 3000 },
    { display: 5000 , value: 5000 },
    { display: 7000 , value: 7000 },
    { display: 10000 , value: 10000 },
    { display: 15000 , value: 15000 },
    { display: 20000 , value: 20000 },
    { display: 25000 , value: 25000 },
    { display: 30000 , value: 30000 },
  ];

  return (
    <div className="flex flex-col mb-5">
      <label className="py-2 font-bold">予算</label>
      {console.log(lowestCost)}
      {console.log(highestCost)}

      <label className="py-2 pl-2 text-sm">下限</label>
      <div className="flex items-center">
        <div className="inline-block relative w-32">
          <select 
          onChange={(e) => setLowestCost(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            {lowestCostArray.map((cost, index) => (
              <option key={index} value={cost.value}>{cost.display}</option>
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
        <p className="ml-2">円</p>
      </div>

      <label className="py-2 pl-2 text-sm">上限</label>
      <div className="flex items-center">
        <div className="inline-block relative w-32">
          <select 
          onChange={(e) => setHighestCost(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
            {highestCostArray.map((cost, index) => (
              <option key={index} value={cost.value}>{cost.display}</option>
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
        <p className="ml-2">円</p>
      </div>
    </div>
  );
}
