import axios from 'axios';
import {getUserInfo, removeUserInfo} from '@/storage/UserStorage';

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
} from '@/storage/AuthStorage';
import {
  SignInPayload,
  SignUpPayload,
  VerifyEmailPayload,
  Auth,
  SignUp,
} from 'auth';

export const ACCESS_EXPIRE_TIME = 60;

export const addToken = async () => {
  try {
    const token = await getAccess();
    client.defaults.headers.Authorization = `Bearer ${token}`;

    const expireTimeNewDate = new Date(await getExpire());
    const now = new Date();
    const diff = (expireTimeNewDate.getTime() - now.getTime()) / 1000;

    // console.log(`now : ${now}`);
    // console.log(`expire : ${expireTimeNewDate}`);
    // console.log(`diff : ${diff}`);

    if (diff < ACCESS_EXPIRE_TIME) {
      await refreshToken();
    }
  } catch (e) {
    console.log(e);
    await removeUserInfo();
    await removeAccess();
    await removeRefresh();

    removeToken();
  }
};

export const removeToken = () => {
  client.defaults.headers.Authorization = null;
};

export const refreshToken = async () => {
  try {
    const refreshToken = await getRefresh();

    const {id} = await getUserInfo();

    if (!refreshToken || !id) {
      console.log("Can't refresh token");
    }

    client.defaults.headers.Authorization = `Bearer ${refreshToken}`;

    const result = await client.post('/auth/token');

    const {token} = result?.data;
    const {accessToken, expireTime} = token;

    client.defaults.headers.Authorization = `Bearer ${accessToken}`;
    await initAccess(accessToken);
    await initExpire(expireTime);
  } catch (e) {
    console.log(e);

    throw new Error('Token Error');
  }
};

export const newRefreshToken = async (token: string): Promise<Auth> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const result = await client.post<Auth>('/auth/refresh');

  return result.data;
};

export const checkToken = async (token: string): Promise<Auth> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const result = await client.post<Auth>('/auth/check');

  return result.data;
};

export const signIn = async (payload: SignInPayload): Promise<Auth> => {
  const results = await client.post<Auth>('/auth/signin', payload);

  return results.data;
};

export const signUp = async (payload: SignUpPayload): Promise<SignUp> => {
  const results = await client.post<SignUp>('/auth/signup', payload);

  return results.data;
};

export const verifyEmail = async (
  payload: VerifyEmailPayload,
): Promise<boolean> => {
  const results = await client.post<boolean>('/auth/verifyemail', payload);

  return results.data;
};
