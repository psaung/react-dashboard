import { useAtom } from "jotai";
import { authStatusAtom } from "../store/authAtom";

export function useAccess(userRole: string) {
  const [{ isLoggedIn, role }] = useAtom(authStatusAtom);

  console.log(role, userRole, isLoggedIn);

  if (!isLoggedIn) {
    console.log("woo skoo doo");
  }
}
