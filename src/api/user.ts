import client from './client';
import {User, UserProfile} from 'user';

export const getUser = async (): Promise<User | null> => {
  console.log('get User data');
  const results = await client.get(`/user`);

  return results.data;
};

export const updateUser = async (
  payload: UserProfile | null | undefined,
): Promise<UserProfile | null> => {
  if (!payload) {
    return null;
  }

  const results = await client.post(`/user/profile`, payload);

  return results.data;
};
