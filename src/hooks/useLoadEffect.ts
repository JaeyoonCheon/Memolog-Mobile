import React, {useEffect} from 'react';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {QueryClient} from '@tanstack/react-query';

import {useAppDispatch} from '@redux/hooks';
import {refreshToken, renewRefreshToken} from '@api/auth';
import {getUser} from '@api/user';
import {getAccess, getRefresh} from '@storage/AuthStorage';
import {getRemember} from '@storage/UserStorage';
import {QUERY_KEY} from '@const/queryKeys';
import {setAuthState, setToken} from '@redux/authSlice';
import {setUserState} from '@/redux/userSlice';

interface CustomTokenPayload extends JwtPayload {
  id: number;
}

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
        dispatch(
          setAuthState({
            authState: 'unauthorized',
          }),
        );
        return;
      }

      dispatch(
        setAuthState({
          authState: 'authorizing',
        }),
      );

      let isAccessValid = false;
      let isRefreshValid = false;

      const now = Math.floor(Date.now() / 1000);

      let at = await getAccess();

      if (at) {
        const decodedAt = jwt_decode<CustomTokenPayload>(at);

        // access token이 존재 + 만료되지 않았을 경우
        if (decodedAt && decodedAt.exp && decodedAt.exp > now) {
          isAccessValid = true;
        }
      }

      // refresh token이 존재 + 만료되지 않았을 경우
      let rt = await getRefresh();

      if (rt) {
        const decodedRt = jwt_decode<CustomTokenPayload>(rt);

        if (decodedRt && decodedRt.exp && decodedRt.exp > now) {
          isRefreshValid = true;
        }
      }

      if (!isAccessValid && !isRefreshValid) {
        dispatch(
          setAuthState({
            authState: 'unauthorized',
          }),
        );
        return;
      } else if (!isAccessValid && isRefreshValid) {
        at = await refreshToken(rt);
      } else if (isAccessValid && !isRefreshValid) {
        rt = await renewRefreshToken(at);
      }

      const userData = await getUser();
      dispatch(setToken({accessToken: at, refreshToken: rt}));
      dispatch(setUserState(userData));

      // 로그인 화면 이동
    };

    loadFn();
  }, []);
}
