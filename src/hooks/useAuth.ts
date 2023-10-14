import { useAtom } from "jotai";
import { AuthProps, authState, defaultAuthStore } from "../store/authAtom";
import { message } from "antd";

export function useAuth() {
  const [auth, setAuth] = useAtom(authState);

  const handleLogout = () => {
    message.info("Successfully logged out!");
    setAuth(defaultAuthStore);
  };

  const handleLogin = (user: AuthProps) => {
    message.success("Login successfully!");
    setAuth(user);
  };

  return {
    onLogin: handleLogin,
    onLogout: handleLogout,
    auth,
  } as const;
}
