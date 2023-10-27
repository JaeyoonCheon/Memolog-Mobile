import React, {useEffect} from 'react';

import client from '@api/client';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setToken, setAccessToken} from '@redux/authSlice';
import {getRefresh, initRefresh} from '@storage/AuthStorage';
import {refreshAccessToken, renewRefreshToken} from '@api/auth';

export const useInterceptor = () => {
  const dispatch = useAppDispatch();
  const {authState, accessToken, refreshToken} = useAppSelector(
    state => state.auth,
  );

  const requestInterceptor = client.interceptors.request.use(
    config => {
      console.log(config);
      console.log(config.url);

      if (!config.headers.Authorization && authState === 'authorized') {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    error => error,
  );
  const responseInterceptor = client.interceptors.response.use(
    value => value,
    async error => {
      const errorBody = error.response.data;
      console.log(errorBody);
      const newRequest = error.config;
      if (error.response.status === 401) {
        if (errorBody.errorCode === 2000) {
          console.log('Please Logout');
        } else if (errorBody.errorCode === 2001) {
          console.log('Access token Error');

          const newAccessToken = await refreshAccessToken(refreshToken);
          dispatch(setAccessToken({accessToken: newAccessToken}));
          console.log(newAccessToken);

          newRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return await client.request(newRequest);
        } else if (errorBody.errorCode === 2003) {
          console.log('Invalid RefreshToken');
        } else if (errorBody.errorCode === 2004) {
          console.log('Refresh token Error');
          const newRefreshToken = await renewRefreshToken(accessToken);
          await initRefresh(newRefreshToken);

          const newAccessToken = await refreshAccessToken(newRefreshToken);
          dispatch(
            setToken({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            }),
          );

          newRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return await client.request(newRequest);
        } else if (errorBody.errorCode === 2007) {
          console.log('Logout');
        }
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(requestInterceptor);
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

export default useInterceptor;
