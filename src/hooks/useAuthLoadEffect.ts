import React, {useEffect} from 'react';

import {useAppDispatch} from '@/redux/hooks';
import {setAccessToken, setUserInfo} from '@/redux/userSlice';
import {refreshToken} from '@/api/auth';
import {getRefresh} from '@/storage/AuthStorage';
import {getUserInfo, getRemember} from '@/storage/UserStorage';

export default function useLoadAuthEffect() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadFn = async () => {
      // 자동 로그인 여부
      const isRemember = await getRemember();
      if (!isRemember) {
        return;
      }

      // Refresh 토큰 없음
      const token = await getRefresh();
      if (!token) {
        return;
      }

      await refreshToken();
    };

    loadFn();
  }, []);
}
