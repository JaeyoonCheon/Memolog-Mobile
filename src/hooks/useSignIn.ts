import React, {useEffect} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signIn} from '@api/auth';
import {RootStackParamList} from 'navigation';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAuthState, setToken} from '@redux/authSlice';
import {setUserState} from '@/redux/userSlice';
import {initAccess, initRefresh} from '@storage/AuthStorage';
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
      const newRefreshToken = data.token.refreshToken;
      dispatch(
        setToken({accessToken: newAccessToken, refreshToken: newRefreshToken}),
      );
      await initAccess(newAccessToken);
      await initRefresh(newRefreshToken);
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
