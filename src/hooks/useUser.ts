import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';

import {QUERY_KEY} from '@/const/queryKeys';
import {getUser} from '@/api/user';
import {User} from 'user';
import {initUserInfo, removeUserInfo} from '@/storage/UserStorage';

export default function useUser() {
  const {data: user} = useQuery<User | null>(
    [QUERY_KEY.user],
    async (): Promise<User | null> => getUser(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      initialData: null,
    },
  );

  console.log('useUser');
  console.log(user);

  useEffect(() => {
    if (!user) {
      removeUserInfo();
    } else {
      initUserInfo(user);
    }
  }, [user]);

  return user ?? null;
}
