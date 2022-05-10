import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//TeacherUser
export type user = {
    id: string;
    email: string;
    flag: string;
    name: string;
    status: boolean;
    photo_url: string;
    occupation: string;
    occupationName: string;
    category: string;
    subjects: Array<string>; 
    title: string;
    detail: string;
    consult: { video: boolean, chat: boolean};
  };
  
  export const teacherUserState = atom<user>({
    key: "teacherUser",
    default: {
      id: "",
      email: "",
      flag: "",
      name: "",
      status: false,
      photo_url: "",
      occupation: "",
      occupationName: "",
      category: "",
      subjects: [],
      title: "",
      detail: "",
      consult: { video: false, chat: false },
    },
  
    effects_UNSTABLE: [persistAtom],
  });