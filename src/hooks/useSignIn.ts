import React from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signIn} from '@/api/auth';
import {RootStackParamList} from 'stack';
import {useNavigation} from '@react-navigation/native';
import {User} from 'user';
import {SignInPayload} from 'auth';
import {QUERY_KEY} from '@/const/queryKeys';

export default function useSignIn() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {mutate: signInMutation} = useMutation<
    User,
    unknown,
    SignInPayload,
    unknown
  >(signIn, {
    onSuccess: async data => {
      queryClient.setQueriesData([QUERY_KEY.user], data);
      navigation.navigate('MainTab');
    },
  });

  return signInMutation;
}
