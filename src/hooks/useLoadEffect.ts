import React, {useEffect} from 'react';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {QueryClient} from '@tanstack/react-query';

import {useAppDispatch} from '@/redux/hooks';
import {checkToken, newRefreshToken} from '@/api/auth';
import {getAccess, getRefresh} from '@/storage/AuthStorage';
import {getRemember} from '@/storage/UserStorage';
import {QUERY_KEY} from '@/const/queryKeys';
import {setAuthState} from '@/redux/userSlice';

interface CustomTokenPayload {
  id: number;
}
type TokenPayload = JwtPayload & CustomTokenPayload;

export default function useLoadEffect() {
  const queryClient = new QueryClient();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const loadFn = async () => {
      /*  
          1.  자동 로그인 여부 체크
          2.  access / refresh 존재 확인 및 만료 여부 확인
            1) 둘 다 만료 이전 => 이후 동작 진행
            2) access만 만료 => refresh로 갱신
            3) refresh만 만료 => access로 갱신
            4) 둘 다 만료 => 로그인 페이지로
          3.  1), 2), 3)의 경우 갱신 성공 시 같이 받은 유저 정보로 갱신
          4.  이후 메인 탭으로 화면 전환
      */

      // 자동 로그인 여부
      const isRemember = await getRemember();
      console.log(isRemember);
      if (!isRemember) {
        console.log('no autoLogin');
        return;
      }

      dispatch(
        setAuthState({
          authState: 'authorizing',
        }),
      );

      const now = new Date().getTime();

      const at = await getAccess();
      const decodedAt = jwt_decode<TokenPayload>(at);
      console.log(decodedAt && 'decodedAt');
      if (decodedAt.exp && decodedAt.exp > now) {
        // access로 검증 후 토큰, 유저 정보 갱신
        const auth = await checkToken(at);
        queryClient.setQueriesData([QUERY_KEY.user], auth);

        dispatch(
          setAuthState({
            authState: 'authorized',
          }),
        );

        return;
      }

      // Refresh 토큰 없음
      const rt = await getRefresh();
      const decodedRt = jwt_decode<TokenPayload>(rt);
      console.log(decodedRt && 'decodedAt');
      if (decodedRt.exp && decodedRt.exp > now) {
        // refresh로 검증 후 토큰, 유저 정보 갱신
        const auth = await newRefreshToken(rt);
        queryClient.setQueriesData([QUERY_KEY.user], auth);

        dispatch(
          setAuthState({
            authState: 'authorized',
          }),
        );
      }

      dispatch(
        setAuthState({
          authState: 'unauthorized',
        }),
      );
      // 로그인 화면 이동
    };

    loadFn();
  }, []);
}
