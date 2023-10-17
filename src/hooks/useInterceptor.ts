import React, {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import client from '@api/client';
import {useAppSelector} from '@redux/hooks';
import useUser from './useUser';
import {getRefresh, initRefresh} from '@storage/AuthStorage';
import {refreshToken, renewRefreshToken} from '@api/auth';
import {QUERY_KEY} from '@const/queryKeys';

export const useInterceptor = () => {
  const {authState} = useAppSelector(state => state.user);
  const user = useUser();
  const queryClient = useQueryClient();

  const requestInterceptor = client.interceptors.request.use(
    config => {
      if (!config.headers.Authorization && authState === 'authorized') {
        if (user && user.token && user.token.accessToken) {
          config.headers.Authorization = `Bearer ${user.token.accessToken}`;
        }
      }

      console.log(config.url);

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
          console.log('Token refreshing');
          const storedRefreshToken = await getRefresh();
          console.log(storedRefreshToken);

          const token = await refreshToken(storedRefreshToken);

          newRequest.Authorization = `Bearer ${token}`;

          return await client.request(newRequest);
        }
        if (errorBody.errorCode === 2004 || errorBody.errorCode === 2007) {
          if (user && user.token && user.token.accessToken) {
            const newRefreshToken = await renewRefreshToken(
              user.token.accessToken,
            );
            await initRefresh(newRefreshToken);

            const token = await refreshToken(newRefreshToken);

            newRequest.Authorization = `Bearer ${token}`;

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
