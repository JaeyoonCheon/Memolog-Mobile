import React, {useEffect} from 'react';

import client from '@api/client';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setToken} from '@redux/authSlice';
import {getRefresh, initRefresh} from '@storage/AuthStorage';
import {refreshToken, renewRefreshToken} from '@api/auth';

export const useInterceptor = () => {
  const dispatch = useAppDispatch();
  const {authState, token} = useAppSelector(state => state.auth);

  const requestInterceptor = client.interceptors.request.use(
    config => {
      if (!config.headers.Authorization && authState === 'authorized') {
        if (token && token.accessToken) {
          config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
      }

      return config;
    },
    error => error,
  );
  const responseInterceptor = client.interceptors.response.use(
    value => value,
    async error => {
      const errorBody = error.response.data;
      console.error(error);
      const newRequest = error.config;
      if (error.response.status === 401) {
        if (errorBody.errorCode === 2000 || errorBody.errorCode === 2001) {
          const storedRefreshToken = await getRefresh();

          const newAccessToken = await refreshToken(storedRefreshToken);
          dispatch(setToken({accessToken: newAccessToken}));

          newRequest.Authorization = `Bearer ${newAccessToken}`;

          return await client.request(newRequest);
        }
        if (errorBody.errorCode === 2004 || errorBody.errorCode === 2007) {
          if (token && token.accessToken) {
            const newRefreshToken = await renewRefreshToken(token.accessToken);
            await initRefresh(newRefreshToken);

            const newAccessToken = await refreshToken(newRefreshToken);
            dispatch(
              setToken({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              }),
            );

            newRequest.Authorization = `Bearer ${newAccessToken}`;

            return await client.request(newRequest);
          }
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
