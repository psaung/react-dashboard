import { Navigate, Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

import { useAccess } from "../../hooks/useAccess";
import { useAuth } from "../../hooks/useAuth";
import { AppMenu } from "../App/AppMenu";
import AppLogo from "../AppLogo";

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const { token } = theme.useToken();
  const { onLogout } = useAuth();
  const { isAuthenticated, role } = useAccess();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",

        color: token.colorText,
      }}
      hasSider
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <AppLogo />
        <AppMenu role={role} />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
          backgroundColor: token.colorBgContainer,
          color: token.colorText,
        }}
      >
        <Header
          style={{
            padding: "0 20px",
            textAlign: "right",
          }}
        >
          <div
            role="button"
            onClick={onLogout}
            style={{
              cursor: "pointer",
            }}
          >
            <LogoutOutlined /> Logout
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
