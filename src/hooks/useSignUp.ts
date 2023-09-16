import React from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signUp} from '@/api/auth';
import {RootStackParamList} from 'stack';
import {useNavigation} from '@react-navigation/native';
import {User} from 'user';
import {SignUpPayload} from 'auth';
import {QUERY_KEY} from '@/const/queryKeys';

export default function useSignUp() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const signUpMutation = useMutation(signUp, {
    onSuccess: async data => {
      queryClient.setQueriesData([QUERY_KEY.user], data);
      navigation.navigate('MakeProfile');
    },
  });

  return signUpMutation;
}
