import { Permission } from "../config/permissions";

export const isAuthorized = (role: string, expectedRole: string): boolean => {
  if (
    !expectedRole ||
    role === Permission.Admin ||
    expectedRole === Permission.All
  ) {
    return true;
  }

  return expectedRole.split(",").includes(role);
};
