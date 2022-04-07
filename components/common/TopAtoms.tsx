import { atom } from "recoil";

export const topState = atom<any>({
  key: "top",
  default: [],
});

export const categoryState = atom<string>({
    key: "category",
    default: "",
  });

export const subjectsState = atom<any>({
key: "subjects",
default: [],
});

export const consultState = atom<any>({
    key: "consult",
    default: {chat: false, video: false},
    });

export const lowestBudgetState = atom({
  key: "lowestBudget",
  default: "",
  });

export const highestBudgetState = atom({
  key: "highestBudget",
  default: "",
  });
