import { atom } from "recoil";

//user
type user = {
  email: string;
  password: string;
  flag: string;
  name: string;
  school: string;
  grade: string;
};

export const userState = atom<user>({
  key: "user",
  default: {
    email: "",
    password: "",
    flag: "student",
    name: "",
    school: "",
    grade: "",
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

//loginPage
type loginPage = {
  loginPage: boolean;
};

export const loginPageState = atom<loginPage>({
  key: "loginPage",
  default: {
    loginPage: true,
  },
});
