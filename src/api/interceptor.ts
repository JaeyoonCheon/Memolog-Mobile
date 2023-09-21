import React, {useEffect} from 'react';
import axios, {InternalAxiosRequestConfig} from 'axios';
import {useNavigation} from '@react-navigation/native';

import client from './client';
import {addToken} from './auth';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import useUser from '@/hooks/useUser';

interface InterceptorProps {
  children: React.ReactElement;
}

export const Interceptor = ({children}: InterceptorProps) => {
  const {authState} = useAppSelector(state => state.user);
  console.log(authState);
  const user = useUser();
  useEffect(() => {
    client.interceptors.request.use(async function (
      config: InternalAxiosRequestConfig,
    ) {
      console.log(`intercept request : ${config.url}`);
      console.log(`auth state : ${authState}`);
      console.log(`user query state : ${user}`);

      if (user && authState === 'authorized') {
        config.headers.Authorization = `Bearer ${user?.token.accessToken}`;
      }

      return config;
    });
  }, [authState]);

  useEffect(() => {
    client.interceptors.response.use(
      async function (response) {
        return response;
      },
      async function (error) {
        return Promise.reject(error);
      },
    );
  });
  return children;
};
