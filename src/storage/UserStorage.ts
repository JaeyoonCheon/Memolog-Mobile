import {storeData, getData, removeData, containsKey} from './AsyncStorage';

export const initUserInfo = async (data: string): Promise<boolean> => {
  const hasKey = await containsKey('UserInfo');

  if (hasKey) {
    await storeData('UserInfo', data);

    return true;
  }

  return false;
};

export const getUserInfo = async (): Promise<string> => {
  const result = await getData('UserInfo');

  return result;
};

export const removeUserInfo = async () => {
  await removeData('UserInfo');
};
