import { atomWithWebStorage } from "../utils/jotaiHelpers";

export interface AuthProps {
  user: string;
  isLoggedIn: boolean;
  role: string;
  token: string | null;
}

export const defaultAuthStore: AuthProps = {
  user: "",
  isLoggedIn: false,
  role: "Guest",
  token: null,
};

export const authState = atomWithWebStorage<AuthProps>(
  "auth",
  defaultAuthStore,
);
