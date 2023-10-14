import { useMutation, useQuery } from "react-query";
import { defaultRequestParams, apiResolver } from "../utils/apiHelpers";
import { useClient } from "./useClient";
const baseUrl = process.env.REACT_APP_API_URL;

/**
 * utility function to fetch data from listing apis
 * @param param0
 */
export function useListingQuery({
  queryKey,
  url,
  config,
  withCredentials = false,
  ...query
}: any): any {
  const client = useClient();
  const queryObj = { ...defaultRequestParams, ...query };
  const params = new URLSearchParams(queryObj).toString();
  const response = useQuery(
    [queryKey, queryObj],
    () =>
      client(`${baseUrl}${url}?${params}`, {
        withCredentials,
      }).then(({ data }: any) => apiResolver(data)),
    config || {},
  );

  return { ...response, loading: response.isLoading };
}

/**
 * query function to operate mutation effects on backend api
 * @param mutation config
 */
export function useMutateQuery({
  method,
  header = "json",
  withCredentials = false,
  ...options
}: any) {
  const client = useClient();

  return useMutation(
    ({
      url,
      body,
      token,
      handleProgress = () => null,
      onError = () => null,
      onSuccess = () => null,
    }: any) =>
      client(`${baseUrl}${url}`, {
        method,
        data: body,
        header,
        token,
        handleProgress,
        onError,
        onSuccess,
        withCredentials,
      }),
    {
      onSuccess: ({ data }) => apiResolver(data),
      ...options,
    },
  );
}

export function useFetchQuery({
  queryKey,
  url,
  config,
  plainUrl,

  withCredentials = false,
  ...queryObj
}: any) {
  const client = useClient();
  const params = new URLSearchParams(queryObj).toString();
  const path = plainUrl || `${baseUrl}${url}`;
  const response = useQuery(
    [queryKey, queryObj],
    () =>
      client(`${path}?${params}`, { withCredentials }).then(({ data }: any) => {
        return apiResolver(data);
      }),
    config || {},
  );

  return { ...response, loading: response.isLoading };
}
