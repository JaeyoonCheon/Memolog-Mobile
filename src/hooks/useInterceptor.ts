import React, {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';

import client from '@api/client';
import {useAppSelector} from '@redux/hooks';
import useUser from './useUser';
import {getRefresh} from '@storage/AuthStorage';
import {renewRefreshToken} from '@api/auth';
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
      if (error.response.status === 401) {
        console.log('Token refreshing');
        const refreshToken = await getRefresh();
        console.log(refreshToken);
        const newRefreshToken = await renewRefreshToken(refreshToken);

        const newRequest = error.config;
        newRequest.Authorization = `Bearer ${newRefreshToken}`;

        return await client.request(newRequest);
      }

      return Promise.reject(error);
    },
  );

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(requestInterceptor);
      client.interceptors.request.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

export default useInterceptor;
