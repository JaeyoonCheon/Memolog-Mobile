import React, {useEffect} from 'react';
import {useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signUp} from '@api/auth';
import {RootStackParamList} from 'navigation';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAuthState, setToken} from '@redux/authSlice';
import {setUserState} from '@/redux/userSlice';

export default function useSignUp() {
  const dispatch = useAppDispatch();
  const {authState} = useAppSelector(state => state.auth);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const signUpMutation = useMutation(signUp, {
    onSuccess: async data => {
      const userData = data.user;
      dispatch(setUserState(userData));

      const newAccessToken = data.token.accessToken;
      const newRefreshToken = data.token.refreshToken;
      dispatch(
        setToken({accessToken: newAccessToken, refreshToken: newRefreshToken}),
      );

      dispatch(setAuthState({authState: 'authorized'}));
    },
  });

  useEffect(() => {
    if (authState === 'authorized') {
      navigation.navigate('MakeProfile');
    }
  }, [authState]);

  return signUpMutation;
}
