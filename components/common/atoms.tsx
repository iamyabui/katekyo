import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

//user
type user = {
  id: string;
  email: string;
  password: string;
  flag: string;
  name: string;
  school: string;
  grade: string;
  text: string;
  goal: string;
  request: string;
  photo_url: string;
  occupation: string;
  occupationName: string;
};

export const userState = atom<user>({
  key: "user",
  default: {
    id: "",
    email: "",
    password: "",
    flag: "",
    name: "",
    school: "",
    grade: "",
    text: "",
    goal: "",
    request: "",
    photo_url: "",
    occupation: "",
    occupationName: "",
  },

  effects_UNSTABLE: [persistAtom],
});

export const editUserState = atom<user>({
  key: "editUser",
  default: {
    id: "",
    email: "",
    password: "",
    flag: "",
    name: "",
    school: "",
    grade: "",
    text: "",
    goal: "",
    request: "",
    photo_url: "",
    occupation: "",
    occupationName: "",
  },
});

//error
type error = {
  emailError: string;
  passwordError: string;
  nameError: string;
  gradeError: string;
  occupationError: string;
  occupationNameError: string;
};

export const errorState = atom<error>({
  key: "error",
  default: {
    emailError: "",
    passwordError: "",
    nameError: "",
    gradeError: "",
    occupationError: "",
    occupationNameError: "",
  },
});
