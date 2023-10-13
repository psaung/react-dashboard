import { atom } from "jotai";
import { atomWithWebStorage } from "../utils/jotaiHelpers";

type AuthStatusAtom = Omit<AuthStore, "User">;

export interface AuthStore {
  User: string;
  isLoggedIn: boolean;
  role: string;
}

const defaultAuthStore: AuthStore = {
  User: "",
  isLoggedIn: false,
  role: "User",
};

export const authState = atomWithWebStorage<AuthStore>(
  "auth",
  defaultAuthStore,
);

export const authStatusAtom = atom<Readonly<AuthStatusAtom>>((get) => ({
  isLoggedIn: get(authState).isLoggedIn,
  role: get(authState).role,
}));
