import { atom } from "recoil";

//user
export const userState = atom({
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
export const errorState = atom({
  key: "error",
  default: {
    emailError: "",
    passwordError: "",
    nameError: "",
    gradeError: "",
  },
});

//loginPage
export const loginPageState = atom({
  key: "loginPage",
  default: {
    loginPage: true,
  },
});
