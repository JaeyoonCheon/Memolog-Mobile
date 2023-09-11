import AsyncStorage from '@react-native-async-storage/async-storage';

// 비동기 메소드에 대한 ErrorBoundary 지정 예정

export const storeData = async (key: string, value: any) => {
  try {
    const stringified = JSON.stringify(value);

    await AsyncStorage.setItem(key, stringified);
  } catch (error: any) {
    console.error(error);
  }
};

export const getData = async (key: string) => {
  try {
    const result = await AsyncStorage.getItem(key);

    if (result !== null) {
      const data = JSON.parse(result);
      return data;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.error(e.message);
  }
};

export const containsKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e: any) {
    console.error(e.message);
  }
};
