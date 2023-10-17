import React from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signUp} from '@api/auth';
import {RootStackParamList} from 'navigation';
import {useNavigation} from '@react-navigation/native';
import {QUERY_KEY} from '@const/queryKeys';
import {useAppDispatch} from '@redux/hooks';
import {setAuthState} from '@redux/userSlice';

export default function useSignUp() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const signUpMutation = useMutation(signUp, {
    onSuccess: async data => {
      console.log(data);
      queryClient.setQueriesData([QUERY_KEY.user], data);
      dispatch(setAuthState({authState: 'authorized'}));
      navigation.navigate('MakeProfile');
    },
  });

  return signUpMutation;
}
