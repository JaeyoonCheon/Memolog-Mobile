import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import client from './client';
import {addToken, refreshToken, checkRefreshToken} from './auth';

client.interceptors.response.use(
  async function (value) {
    await addToken();
    return value;
  },
  async function (error) {
    if (error.response.data.name === 'ER04') {
      await refreshToken();

      return axios.request(error.config);
    } else if (error.response.data.name === 'ER05') {
      console.log('Too old account');

      const navigation = useNavigation();
      //   navigation.navigate('SignIn');
    } else if (error.response.data.name === 'ER06') {
      const isRefreshTokenExist = await checkRefreshToken();

      if (isRefreshTokenExist) {
        console.log('Refetch refresh token');
        await refreshToken();
      }
    }

    return Promise.reject(error);
  },
);
