import { MenuItemProps } from "antd";

export enum Permission {
  All = "*",
  Admin = "Admin", // Admin can access everything
  Editor = "Editor",
  Guest = "Guest",
}
