import axios, {AxiosRequestConfig} from 'axios';

import {SOURCE_ADDRESS, SOURCE_PORT} from '@env';
import {commonResponse} from 'api';

console.log(SOURCE_ADDRESS);
console.log(SOURCE_PORT);

// wsl2 서버 실행 시 wsl2의 IP address를 대응 후 adb 포트 연동 필요
const baseURL = `http://${SOURCE_ADDRESS}:${SOURCE_PORT}`;

const client = axios.create({
  baseURL,
});

export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<commonResponse<T>> => {
  try {
    const response = await client.get<commonResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<commonResponse<T>, any>(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const postData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<commonResponse<T>> => {
  try {
    const response = await client.post<commonResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<commonResponse<T>, any>(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const putData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<commonResponse<T>> => {
  try {
    const response = await client.put<commonResponse<T>>(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<commonResponse<T>, any>(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<commonResponse<T>> => {
  try {
    const response = await client.delete<commonResponse<T>>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<commonResponse<T>, any>(error)) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};

export default client;
