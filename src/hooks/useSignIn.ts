import React, {useEffect} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signIn} from '@api/auth';
import {RootStackParamList} from 'navigation';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAuthState, setToken} from '@redux/authSlice';
import {setUserState} from '@/redux/userSlice';
import {getRefresh, initRefresh} from '@storage/AuthStorage';
import {renewRefreshToken} from '@api/auth';
import {initRemember} from '@/storage/UserStorage';

export default function useSignIn(isRemember: boolean) {
  const dispatch = useAppDispatch();
  const {authState} = useAppSelector(state => state.auth);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const signInMutation = useMutation(signIn, {
    onSuccess: async data => {
      if (isRemember) {
        await initRemember(true);
      }

      console.log(data);

      const userData = data.user;
      dispatch(setUserState(userData));

      const newAccessToken = data.token.accessToken;
      dispatch(setToken({accessToken: newAccessToken}));

      const storedRefresh = await getRefresh();

      if (storedRefresh === undefined) {
        if (newAccessToken) {
          const newRefreshToken = await renewRefreshToken(newAccessToken);

          dispatch(setToken({refreshToken: newRefreshToken}));
          await initRefresh(newRefreshToken ?? '');
        }
      }
      dispatch(setAuthState({authState: 'authorized'}));
    },
  });

  useEffect(() => {
    if (authState === 'authorized') {
      navigation.navigate('MainTab');
    }
  }, [authState]);

  return signInMutation;
}
