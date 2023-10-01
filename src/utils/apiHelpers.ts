import axios from 'axios';
import { isEmpty } from 'lodash';
import { stringify } from 'qs';

const needBasicAuth = process.env.REACT_APP_BASIC_AUTH;

export const getCookies = (name: string) => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const defaultRequestParams = {
  Page: 1,
  Size: 20,
};

export const api = (
  path: string,
  method = 'GET',
  payload: any,
  params?: any,
  token = '',
  header = 'json',
  trackProgress = (_: any) => null,
  withCredentials = false
) => {
  const options: any = {
    url: path,
    method: method.toUpperCase(),
    headers: {},
    onUploadProgress: (events: any) => {
      trackProgress(events);
    },
  };

  if (!isEmpty(params)) {
    options['url'] =
      options['url'] + stringify(params, { addQueryPrefix: true });
  }

  if (token) {
    options['headers']['Authorization'] = 'Bearer ' + token;
  }

  if (!token && needBasicAuth) {
    options['auth'] = {
      username: process.env.REACT_APP_AUTH_USER_NAME,
      password: process.env.REACT_APP_AUTH_PASSWORD,
    };
  }

  if (payload) {
    options['data'] = payload;
  }

  if (withCredentials) {
    options['withCredentials'] = true;
    options['crossDomain'] = true;
    const accessToken = getCookies('access_token');
    options['headers']['Cookie'] = 'access_token=' + accessToken;
  }

  switch (header) {
    case 'ignore':
      break;
    // if multipart ignore the option headers
    case 'multipart':
      options['headers']['Content-Type'] = 'multipart/form-data';
      break;
    case 'csv':
      options['headers']['Accept'] = 'application/csv';
      options['responseType'] = 'blob';
      break;
    default:
      options['headers']['Content-Type'] = 'application/json';
  }

  return axios(options);
};

/**
 * check error code from api result which was resolved after the react query mutation
 * if error code is not zero, throw with error message from api
 *
 * @param response
 * @param cb
 */
export function apiResolver(response: any, cb = (response: any) => null) {
  if (response.statusCode !== 200) {
    // TODO: show only something went wrong exception if the environment is for the production;
    return Promise.reject(response.error_msg);
  } else {
    return cb(response);
  }
}
