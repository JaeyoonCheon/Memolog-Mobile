import {getData, postData} from './client';
import {User, UserProfile} from 'user';

export const getUser = async (): Promise<User | null> => {
  const callResults = await getData<User | null>(`/user`);
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};

export const updateUser = async (
  payload: UserProfile | null | undefined,
): Promise<UserProfile | null> => {
  if (payload === undefined) {
    return null;
  }

  const callResults = await postData<UserProfile | null>(
    `/user/profile`,
    payload,
  );
  if (!callResults.result) {
    throw new Error('API call empty result');
  }

  return callResults.result;
};
