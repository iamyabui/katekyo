import { useRecoilState } from "recoil";
import { editUserState } from "../atoms";
import { teacherUserState } from "../TeacherAtoms";

export default function ConsultMethod() {
  // const [user, setUser] = useRecoilState(teacherUserState);
  const [editUser, setEditUser] = useRecoilState(editUserState);
  // const { consult, setConsult } = props;

  const handleChat = (e) => {
    editUser.consult.chat ? (
      // setConsult({...consult, [e.target.value]: false})
      setEditUser({...editUser, consult : {...editUser.consult, [e.target.value]: false}})
    ) : (
      // setConsult({...consult, [e.target.value]: true})
      setEditUser({...editUser, consult : {...editUser.consult, [e.target.value]: true}})
    );
    
  }
  
  const handleVideo = (e) => {
    editUser.consult.video ? (
      // setConsult({...consult, [e.target.value]: false})
      setEditUser({...editUser, consult : {...editUser.consult, [e.target.value]: false}})
    ) : (
      // setConsult({...consult, [e.target.value]: true})
      setEditUser({...editUser, consult : {...editUser.consult, [e.target.value]: true}})
    );
    
  }

  return (
    <>
    {console.log(editUser.consult)}
      <label className="font-bold">相談方法</label>
      <div className="mt-2 ml-2 mb-5" >
        <div>
          <input
            type="checkbox"
            name="chat"
            value="chat"
            className="mr-2 border-gray-600"
            checked={editUser.consult.chat}
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
            checked={editUser.consult.video}
            onChange={handleVideo}
          />
          ビデオ相談
        </div>
      </div>
    </>
  );
}
