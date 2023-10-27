import {storeData, getData, removeData, containsKey} from './AsyncStorage';
import {User} from 'user';

export const initUserInfo = async (data: User): Promise<boolean> => {
  await storeData('UserInfo', data);

  return true;
};

export const getUserInfo = async (): Promise<User> => {
  const result = await getData('UserInfo');

  return result;
};

export const removeUserInfo = async () => {
  await removeData('UserInfo');
};

export const initRemember = async (data: boolean): Promise<boolean> => {
  await storeData('Remember', data);

  return true;
};

export const getRemember = async (): Promise<boolean> => {
  const result = await getData('Remember');

  console.log(`in storage ${result}`);

  if (!result) {
    return false;
  } else {
    return true;
  }
};

export const removeRemember = async () => {
  await removeData('Remember');
};
