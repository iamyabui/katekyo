import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom<any>({
  key: "user",
  default: {},
});

export const editUserState = atom<any>({
  key: "editUser",
  default: {},

  effects_UNSTABLE: [persistAtom],
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
