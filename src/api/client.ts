import axios from 'axios/index';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {SOURCE_ADDRESS, SOURCE_PORT} from '@env';

// wsl2 서버 실행 시 wsl2의 IP address를 대응 후 adb 포트 연동 필요
const baseURL = `http://${SOURCE_ADDRESS}:${SOURCE_PORT}`;

const client = axios.create({
  baseURL,
});

export default client;
