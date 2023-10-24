import axios, {InternalAxiosRequestConfig} from 'axios';
import {getUserInfo, removeUserInfo} from '@storage/UserStorage';

import client from './client';
import {SignInPayload, SignUpPayload, VerifyEmailPayload} from 'auth';
import {Token} from 'auth';
import {User} from 'user';
import {APIResponse} from 'api';

export const refreshToken = async (token: string): Promise<Token> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const result = await client.post<Token>('/auth/refresh');

  return result.data;
};

export const renewRefreshToken = async (token: string): Promise<Token> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const result = await client.post<Token>('/auth/renew-refresh');

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
