import client from './client';
import {User} from 'user';

export const getUser = async (
  payload: User | null | undefined,
): Promise<User | null> => {
  if (!payload) {
    return null;
  }
  const {id} = payload;

  const results = await client.get(`/user/profile/${id}`);

  return results.data;
};

export const updateUser = async (
  payload: User | null | undefined,
): Promise<User | null> => {
  if (!payload) {
    return null;
  }

  const results = await client.post(`/user/profile`, payload);

  return results.data;
};
