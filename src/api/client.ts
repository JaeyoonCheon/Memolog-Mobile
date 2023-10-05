import axios, {AxiosRequestConfig} from 'axios';

import {SOURCE_ADDRESS, SOURCE_PORT} from '@env';
import {commonResponse} from 'api';
import {getUserInfo} from '@/storage/UserStorage';

console.log(SOURCE_ADDRESS);
console.log(SOURCE_PORT);

// wsl2 서버 실행 시 wsl2의 IP address를 대응 후 adb 포트 연동 필요

const axiosConfigure: AxiosRequestConfig = {
  baseURL: `http://${SOURCE_ADDRESS}:${SOURCE_PORT}`,
  timeout: 5000,
  withCredentials: true,
};

const client = axios.create(axiosConfigure);

export default client;
