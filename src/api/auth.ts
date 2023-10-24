import client from './client';
import {SignInPayload, SignUpPayload, VerifyEmailPayload} from 'auth';
import {UserQueryState} from 'user';
import {postData} from './client';

export const refreshToken = async (token: string): Promise<string> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const callResults = await postData<string>('/auth/refresh');
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const renewRefreshToken = async (token: string): Promise<string> => {
  client.defaults.headers.Authorization = `Bearer ${token}`;

  const callResults = await postData<string>('/auth/renew-refresh');
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const signIn = async (
  payload: SignInPayload,
): Promise<UserQueryState> => {
  const callResults = await postData<UserQueryState>('/auth/signin', payload);
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const signUp = async (
  payload: SignUpPayload,
): Promise<UserQueryState> => {
  const callResults = await postData<UserQueryState>('/auth/signup', payload);
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const verifyEmail = async (
  payload: VerifyEmailPayload,
): Promise<void> => {
  await postData<void>('/auth/verify-email', payload);
};
