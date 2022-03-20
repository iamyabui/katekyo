import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//StudentUser
type user = {
    id: string;
    email: string;
    flag: string;
    name: string;
    school: string;
    grade: string;
    text: string;
    goal: string;
    request: string;
    photo_url: string;
  };
  
  export const studentUserState = atom<user>({
    key: "studentUser",
    default: {
      id: "",
      email: "",
      flag: "",
      name: "",
      school: "",
      grade: "",
      text: "",
      goal: "",
      request: "",
      photo_url: "",
    },
    
    effects_UNSTABLE: [persistAtom],
  });