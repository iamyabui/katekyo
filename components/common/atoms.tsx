import { atom } from "recoil";

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
};

export const userState = atom<user>({
  key: "user",
  default: {
    id: "",
    email: "",
    password: "",
    flag: "student",
    name: "",
    school: "",
    grade: "",
    text: "",
    goal: "",
    request: "",
    photo_url: "",
  },
});

export const editUserState = atom<user>({
  key: "editUser",
  default: {
    id: "",
    email: "",
    password: "",
    flag: "student",
    name: "",
    school: "",
    grade: "",
    text: "",
    goal: "",
    request: "",
    photo_url: "",
  },
});

//error
type error = {
  emailError: string;
  passwordError: string;
  nameError: string;
  gradeError: string;
};

export const errorState = atom<error>({
  key: "error",
  default: {
    emailError: "",
    passwordError: "",
    nameError: "",
    gradeError: "",
  },
});
