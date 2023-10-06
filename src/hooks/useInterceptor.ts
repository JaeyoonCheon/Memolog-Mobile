import React, {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import client from '@/api/client';
import {useAppSelector} from '@/redux/hooks';
import useUser from './useUser';
import {getRefresh} from '@/storage/AuthStorage';
import {newRefreshToken} from '@/api/auth';
import {QUERY_KEY} from '@/const/queryKeys';

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
      if (error.status === 400 || error.status === 401) {
        const refreshToken = await getRefresh();
        const newUserData = await newRefreshToken(refreshToken);
        queryClient.setQueryData([QUERY_KEY.user], newUserData);

        const newRequest = error.config;
        newRequest.Authorization = `Bearer ${newUserData.token.accessToken}`;

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
