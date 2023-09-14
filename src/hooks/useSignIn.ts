import React from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signIn} from '@/api/auth';
import {RootStackParamList} from 'stack';
import {useNavigation} from '@react-navigation/native';
import {User} from 'user';
import {SignInPayload, SignIn} from 'auth';
import {QUERY_KEY} from '@/const/queryKeys';

export default function useSignIn(isRemember: boolean) {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const signInMutation = useMutation(signIn, {
    onSuccess: async data => {
      queryClient.setQueriesData([QUERY_KEY.user], data);
      navigation.navigate('MainTab');
    },
  });

  return signInMutation;
}
