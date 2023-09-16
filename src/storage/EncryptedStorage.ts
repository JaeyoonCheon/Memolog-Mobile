import EncryptedStorage from 'react-native-encrypted-storage';

// 비동기 메소드에 대한 ErrorBoundary 지정 예정

export const storeEncryptedData = async (key: string, value: any) => {
  try {
    const stringified = JSON.stringify(value);

    await EncryptedStorage.setItem(key, stringified);
  } catch (error: any) {
    console.error(error);
  }
};

export const getEncryptedData = async (key: string) => {
  try {
    const result = await EncryptedStorage.getItem(key);

    if (result !== null) {
      const data = JSON.parse(result);
      return data;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const removeEncryptedData = async (key: string) => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e: any) {
    console.error(e.message);
  }
};
