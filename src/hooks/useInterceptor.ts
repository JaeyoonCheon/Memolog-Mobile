import React, {useEffect} from 'react';

import client from '@/api/client';
import {useAppSelector} from '@/redux/hooks';
import useUser from './useUser';

export const useInterceptor = () => {
  const {authState} = useAppSelector(state => state.user);
  const user = useUser();
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

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(requestInterceptor);
    };
  }, [requestInterceptor]);
};

export default useInterceptor;
