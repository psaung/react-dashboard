import { ConfigProvider, message } from "antd";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";

export default function RootLayout() {
  const [_, contextHolder] = message.useMessage();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          colorText: "#fff",
          borderRadius: 2,
          colorBgContainer: "#242424",
        },
      }}
    >
      <Layout
        style={{
          color: "#00b96b",
          backgroundColor: "#242424",
          minHeight: "100vh",
        }}
      >
        {contextHolder}
        <Outlet />
      </Layout>
    </ConfigProvider>
  );
}
