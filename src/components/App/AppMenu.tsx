import type { MenuProps } from "antd";
import { Menu } from "antd";
import { routeHelpers } from "../../utils/routeHelpers";
import { appRoutes } from "../../Router";
import { useMatches, useNavigate } from "react-router-dom";

export const AppMenu = ({ role }: { role: string }) => {
  const navigate = useNavigate();
  const matches = useMatches();
  const activeRoute = matches[matches.length - 1];

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={onClick}
      style={{ width: 256 }}
      items={routeHelpers(appRoutes, role)}
      defaultSelectedKeys={[activeRoute.pathname]}
    />
  );
};
