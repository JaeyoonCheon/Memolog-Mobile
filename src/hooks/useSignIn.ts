import React, {useEffect} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {StackNavigationProp} from '@react-navigation/stack';

import {signIn} from '@api/auth';
import {RootStackParamList} from 'navigation';
import {useNavigation} from '@react-navigation/native';
import {QUERY_KEY} from '@const/queryKeys';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {setAuthState} from '@redux/userSlice';
import {getRefresh, initRefresh} from '@storage/AuthStorage';
import {renewRefreshToken} from '@api/auth';

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

      const storedRefresh = await getRefresh();

      console.log(typeof storedRefresh);
      console.log(`stored : ${storedRefresh}`);

      if (storedRefresh === undefined) {
        const accessToken = data.token.accessToken;
        const newRefreshToken = await renewRefreshToken(accessToken);

        console.log(newRefreshToken);

        await initRefresh(newRefreshToken ?? '');
      }
    },
  });

  useEffect(() => {
    if (authState === 'authorized') {
      navigation.navigate('MainTab');
    }
  }, [authState]);

  return signInMutation;
}
