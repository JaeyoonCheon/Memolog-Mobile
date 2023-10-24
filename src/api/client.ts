import axios, {AxiosRequestConfig} from 'axios';

import {SOURCE_ADDRESS, SOURCE_PORT} from '@env';
import {APIResponse} from 'api';

console.log(SOURCE_ADDRESS);
console.log(SOURCE_PORT);

// wsl2 서버 실행 시 wsl2의 IP address를 대응 후 adb 포트 연동 필요

const axiosConfigure: AxiosRequestConfig = {
  baseURL: `http://${SOURCE_ADDRESS}:${SOURCE_PORT}`,
  timeout: 5000,
  withCredentials: true,
};

const client = axios.create(axiosConfigure);

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await client.get<APIResponse<T>>(url, config);
  return response.data;
};

export const postData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await client.post<APIResponse<T>>(url, data, config);
  return response.data;
};

export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  const response = await client.delete<APIResponse<T>>(url, config);
  return response.data;
};

export default client;
