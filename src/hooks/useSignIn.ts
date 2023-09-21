import React from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signIn} from '@/api/auth';
import {RootStackParamList} from 'stack';
import {useNavigation} from '@react-navigation/native';
import {QUERY_KEY} from '@/const/queryKeys';
import {useAppDispatch, useAppSelector} from '@/redux/hooks';
import {setAuthState} from '@/redux/userSlice';

export default function useSignIn(isRemember: boolean) {
  const dispatch = useAppDispatch();
  const {authState} = useAppSelector(state => state.user);
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const signInMutation = useMutation(signIn, {
    onSuccess: async data => {
      console.log(data);
      queryClient.setQueryData([QUERY_KEY.user], data);
      dispatch(setAuthState({authState: 'authorized'}));
      navigation.navigate('MainTab');
    },
  });

  return signInMutation;
}
