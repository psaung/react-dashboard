import { useAtom } from "jotai";
import { authState } from "../store/authAtom";
import { useMatches } from "react-router-dom";
import { isAuthorized } from "../utils/permissionHelpers";
import { isObject, isString } from "lodash";
import { Permission } from "../config/permissions";

interface useAccessProps {
  isAuthorized: boolean;
  isAuthenticated: boolean;
  role: string;
}

/**
 * supposed to check whether the access is authenticated and isAuthorized
 * able to use inside the Layout
 */
export function useAccess(): useAccessProps {
  const [{ isLoggedIn, role }] = useAtom(authState);
  const matches = useMatches();

  // check the match permission from bottom to top appraoch
  const permission = matches.reverse().find((x) => !!x.handle)?.handle;

  if (!isLoggedIn) {
    return {
      isAuthorized: false,
      isAuthenticated: false,
      role,
    };
  }

  if (isObject(permission)) {
    return {
      isAuthorized: isAuthorized(role, (permission as any)?.role),
      isAuthenticated: true,
      role,
    };
  }

  if (isString(permission)) {
    return {
      isAuthorized: isAuthorized(role, permission),
      isAuthenticated: true,
      role,
    };
  }

  return {
    isAuthenticated: true,
    isAuthorized: true,
    role,
  };
}
