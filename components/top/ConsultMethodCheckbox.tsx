import { useRecoilState } from "recoil";
import { consultState } from "../common/TopAtoms";

export default function ConsultMethodCheckbox() {
  const [consult, setConsult] = useRecoilState(consultState);

  const handleChat = (e) => {
    consult.chat ? (
      setConsult({...consult, [e.target.value]: false})
    ) : (
      setConsult({...consult, [e.target.value]: true})
    );
    
  }
  
  const handleVideo = (e) => {
    consult.video ? (
      setConsult({...consult, [e.target.value]: false})
    ) : (
      setConsult({...consult, [e.target.value]: true})
    );
    
  }

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
            checked={consult.chat}
            onChange={handleChat}
          />
          チャット相談
        </div>
        <div>
          <input
            type="checkbox"
            name="video"
            value="video"
            className="mr-2 border-gray-600"
            checked={consult.video}
            onChange={handleVideo}
          />
          ビデオ相談
        </div>
      </div>
    </>
  );
}
