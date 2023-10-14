import { MenuProps } from "antd";
import { isAuthorized } from "./permissionHelpers";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const extractRoute = (route: any, role: string) => {
  let items = [];

  if (route.hideInMenu) {
    return null;
  }

  if (route.handle && !isAuthorized(role, route.handle)) {
    return null;
  }

  if (route.children?.length > 0) {
    items = route.children
      .map((x: any) => extractRoute(x, role))
      .filter(Boolean);
  }

  if (items.length) {
    return getItem(route.name, route.path, route.icon, items);
  }

  return getItem(route.name, route.path, route.icon);
};

export const routeHelpers = (routes: any, role: string) => {
  const menu = routes?.[0].children
    .map((x: any) => extractRoute(x, role))
    .filter(Boolean);

  return menu;
};
