import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';

import {QUERY_KEY} from '@/const/queryKeys';
import {getUser} from '@/api/user';
import {User} from 'user';
import {initUserInfo, getUserInfo, removeUserInfo} from '@/storage/UserStorage';

export default async function useUser() {
  const initUserData = await getUserInfo();

  const {data: user} = useQuery<User | null>(
    [QUERY_KEY.user],
    async (): Promise<User | null> => getUser(user),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: initUserData,
    },
  );

  useEffect(() => {
    if (!user) {
      removeUserInfo();
    } else {
      initUserInfo(user);
    }
  }, [user]);

  return {user: user ?? null};
}
