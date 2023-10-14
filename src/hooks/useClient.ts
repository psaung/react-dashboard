import React from "react";

import AxiosClientDto from "../dtos/axios-client.dto";
import { api } from "../utils/apiHelpers";

/**
 * a helper function for react query which will decorate api calls depends on the type of the parameters
 * TODO: if response had 401 status, need to call logout function
 *
 * @param endpoint
 * @param param1
 */

interface ApiClientDto extends AxiosClientDto {
  handleProgress?: (events: any) => any;
  onError?: (error: any) => any;
  onSuccess?: (response: any) => any;
  forceLogout?: () => void;
  withCredentials?: boolean;
}

export async function client(
  endpoint: string,
  {
    method = "GET",
    params,
    data,
    token,
    header = "json",
    withCredentials = false,
    forceLogout = () => {},
    handleProgress = (_: any) => null,
    onError = (_: any) => null,
    onSuccess = (_: any) => null,
  }: ApiClientDto,
) {
  return await api(
    endpoint,
    method,
    data,
    params,
    token,
    header,
    handleProgress,
    withCredentials,
  )
    .then((response) => {
      onSuccess(response);
      return Promise.resolve(response);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        forceLogout();
        const message = { message: "Unauthorized!", code: 401 };
        onError(message);
        return Promise.reject(message);
      }
      onError(error);
      return Promise.reject(error);
    });
}

export function useClient() {
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    window.location.href = "/login"; // force update the react routes for flushing so values inside the memory
  };
  return React.useCallback(
    (endpoint: string, config: ApiClientDto = {}) =>
      client(endpoint, { ...config, forceLogout: handleLogout }),
    [],
  );
}
