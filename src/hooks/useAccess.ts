import { useAtom } from "jotai";
import { authState } from "../store/authAtom";
import { useMatches } from "react-router-dom";

export function useAccess(userRole: string) {
  const [{ isLoggedIn, role }] = useAtom(authState);
  const matches = useMatches();

  console.log(role, userRole, isLoggedIn, matches);
}
