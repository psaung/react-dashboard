import { useAtom } from "jotai";
import { AuthProps, authState, defaultAuthStore } from "../store/authAtom";

export function useAuth() {
  const [auth, setAuth] = useAtom(authState);

  const handleLogout = () => {
    setAuth(defaultAuthStore);
  };

  const handleLogin = (user: AuthProps) => {
    setAuth(user);
  };

  return {
    onLogin: handleLogin,
    onLogout: handleLogout,
    auth,
  } as const;
}
