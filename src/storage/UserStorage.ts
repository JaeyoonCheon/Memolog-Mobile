import {storeData, getData, removeData, containsKey} from './AsyncStorage';
import {User} from 'user';

export const initUserInfo = async (data: User): Promise<boolean> => {
  const hasKey = await containsKey('UserInfo');

  if (hasKey) {
    await storeData('UserInfo', data);

    return true;
  }

  return false;
};

export const getUserInfo = async (): Promise<User> => {
  const result = await getData('UserInfo');

  return result;
};

export const removeUserInfo = async () => {
  await removeData('UserInfo');
};

export const initRemember = async (data: boolean): Promise<boolean> => {
  const hasKey = await containsKey('Remember');

  if (hasKey) {
    await storeData('Remember', data);

    return true;
  }

  return false;
};

export const getRemember = async (): Promise<boolean> => {
  const result = await getData('Remember');

  return result;
};

export const removeRemember = async () => {
  await removeData('Remember');
};
