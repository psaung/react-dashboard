export const isAuthorize = (role: string, expectedRole: string): boolean => {
  if (expectedRole === "*") {
    return true;
  }

  return expectedRole.split(",").includes(role);
};
