import { Button } from "antd";
import { useAuth } from "../../hooks/useAuth";
import { Permission } from "../../config/permissions";

export function Component() {
  const { onLogin } = useAuth();

  const handleLoginWithAdmin = () => {
    onLogin({
      user: "Admin",
      isLoggedIn: true,
      role: Permission.Admin,
      token: "Abc",
    });
  };

  const handleLoginWithEditor = () => {
    onLogin({
      user: "Editor",
      isLoggedIn: true,
      role: Permission.Editor,
      token: "Abc",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        minWidth: "500px",
        flexDirection: "row",
        margin: "100px auto 0",
        columnGap: "20px",
      }}
    >
      <Button
        type="primary"
        onClick={handleLoginWithAdmin}
        style={{ boxShadow: "none" }}
      >
        Logged In With Admin
      </Button>
      <Button type="default" onClick={handleLoginWithEditor}>
        Logged In With Editor
      </Button>
    </div>
  );
}

Component.displayName = "Login";
