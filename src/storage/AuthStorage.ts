import {
  storeEncryptedData,
  getEncryptedData,
  removeEncryptedData,
} from './EncryptedStorage';

export const initAccess = async (data: string): Promise<boolean> => {
  const hasKey = await getEncryptedData('Access');

  if (hasKey === undefined) {
    await storeEncryptedData('Access', data);

    return true;
  }

  return false;
};

export const getAccess = async (): Promise<string> => {
  const result = await getEncryptedData('Access');

  return result;
};

export const removeAccess = async () => {
  await removeEncryptedData('Access');
};

export const initRefresh = async (data: string): Promise<boolean> => {
  const hasKey = await getEncryptedData('Refresh');

  if (hasKey === undefined) {
    await storeEncryptedData('Refresh', data);

    return true;
  }

  return false;
};

export const getRefresh = async (): Promise<string> => {
  const result = await getEncryptedData('Refresh');

  return result;
};

export const removeRefresh = async () => {
  await removeEncryptedData('Refresh');
};

export const initExpire = async (data: string): Promise<boolean> => {
  const hasKey = await getEncryptedData('Expire');

  if (hasKey === undefined) {
    await storeEncryptedData('Expire', data);

    return true;
  }

  return false;
};

export const getExpire = async (): Promise<string> => {
  const result = await getEncryptedData('Expire');

  return result;
};

export const removeExpire = async () => {
  await removeEncryptedData('Expire');
};
