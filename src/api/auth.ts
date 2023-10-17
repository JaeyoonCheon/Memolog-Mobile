import axios, {InternalAxiosRequestConfig} from 'axios';
import {getUserInfo, removeUserInfo} from '@storage/UserStorage';

import client from './client';
import {
  initAccess,
  initRefresh,
  initExpire,
  getAccess,
  getRefresh,
  getExpire,
  removeAccess,
  removeRefresh,
  removeExpire,
} from '@storage/AuthStorage';
import {SignInPayload, SignUpPayload, VerifyEmailPayload} from 'auth';
import {User} from 'user';
import useUser from '@hooks/useUser';

export const ACCESS_EXPIRE_TIME = 60;

export const addToken = async (config: InternalAxiosRequestConfig) => {
  console.log('add token');
  try {
    const user = useUser();
    if (!user) {
      return;
    }
    const {token} = user;

    config.headers['Authorization'] = `Bearer ${token}`;

    const expireTimeNewDate = new Date(await getExpire());
    const now = new Date();
    const diff = (expireTimeNewDate.getTime() - now.getTime()) / 1000;

    // console.log(`now : ${now}`);
    // console.log(`expire : ${expireTimeNewDate}`);
    // console.log(`diff : ${diff}`);

    // if (diff < ACCESS_EXPIRE_TIME) {
    //   await refreshToken();
    // }
  } catch (e) {
    console.log(e);
    await removeUserInfo();
    await removeAccess();
    await removeRefresh();

    removeToken(config);
  }
};

export const removeToken = (config: InternalAxiosRequestConfig) => {
  config.headers['Authorization'] = null;
};

export const refreshToken = async (token: string): Promise<string> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const result = await client.post('/auth/refresh');

  return result.data;
};

export const renewRefreshToken = async (token: string): Promise<string> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const result = await client.post('/auth/renew-refresh');

  return result.data;
};

export const checkToken = async (token: string): Promise<User> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const result = await client.post<User>('/auth/check');

  console.log(result.data);

  return result.data;
};

export const signIn = async (payload: SignInPayload): Promise<User> => {
  const results = await client.post<User>('/auth/signin', payload);

  console.log(results.data);

  return results.data;
};

export const signUp = async (payload: SignUpPayload): Promise<User> => {
  const results = await client.post<User>('/auth/signup', payload);

  console.log(results.data);

  return results.data;
};

export const verifyEmail = async (
  payload: VerifyEmailPayload,
): Promise<boolean> => {
  const results = await client.post<boolean>('/auth/verify-email', payload);

  return results.data;
};
