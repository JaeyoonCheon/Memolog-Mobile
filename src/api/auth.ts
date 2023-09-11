import axios from 'axios';
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
import {getUserInfo, removeUserInfo} from '@/storage/UserStorage';

import client from './client';

export const ACCESS_EXPIRE_TIME = 60;

export const addToken = async (token: string) => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  try {
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

    const {userId} = JSON.parse(await getUserInfo());

    if (!refreshToken || !userId) {
      console.log("Can't refresh token");
    }

    client.defaults.headers.Authorization = `Bearer ${refreshToken}`;

    const result = await client.post('/auth/token', {
      userId: userId,
    });

    const {token} = result?.data;
    const {accessToken, expireTime} = token;

    client.defaults.headers.Authorization = `Bearer ${accessToken}`;
    initAccess(accessToken);
    initExpire(expireTime);
  } catch (e) {
    console.log(e);

    throw new Error('Token Error');
  }
};

const checkRefreshToken = async () => {
  const refreshToken = await getRefresh();

  return !!refreshToken;
};
