import {
    useMutation,
    useQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { 
    UseMutationCustomOptions,
    UseQueryCustomOptions,
} from '@/types/common';
import { 
    removeEncryptStorage, 
    setEncryptStorage,
} from '@/utils';
import { 
    removeHeader, 
    setHeader,
} from '@/utils/headers';
import { 
    ResponseProfile,
    getAccessToken, 
    getProfile, 
    logout, 
    postLogin, 
    postSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import { 
    queryKey,
    storageKey,
    requestHeaderKey,
    numbers,
} from '@/constants';

const useSignup = (mutationOptions?: UseMutationCustomOptions) => {
    return useMutation({
        mutationFn: postSignup,
        ...mutationOptions,
    });
};

const useLogin = (mutationOptions?: UseMutationCustomOptions) => {
    return useMutation({
        mutationFn: postLogin,
        onSuccess: (data) => {
            const {
                accessToken,
                refreshToken,
            } = data;

            setEncryptStorage(storageKey.REFRESH_TOKEN, refreshToken);
            setHeader(
                requestHeaderKey.AUTHORIZATION, 
                `${requestHeaderKey.AUTHORIZATION_PREFIX} ${accessToken}`
            );
        },
        // try ~ catch 의 `catch` 역할의 callback
        onSettled: () => {
            // `useGetRefreshToken()` 에 설정한 token 갱신 설정이 적용되도록,
            // `useGetRefreshToken()` 를 refetch 한다.
            queryClient.refetchQueries({
                queryKey: [queryKey.AUTH, queryKey.GET_ACCESS_TOKEN],
            });

            // 이전에 Logout 했던 계정의 Profile 정보가 있을 수 있으므로,
            // useGetProfile 을 `무효화` 시킨다.
            queryClient.invalidateQueries({
                queryKey: [queryKey.AUTH, queryKey.GET_PROFILE],
            });
        },
        ...mutationOptions,
    });
};

const useGetRefreshToken = () => {
    const {
        isSuccess,
        isError,
        data,
    } = useQuery({
        queryKey: [queryKey.AUTH, queryKey.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        // cache 데이터 (API 응답 데이터) 의 만료 시간 설정
        // (stale 뜻: 신선하지 않음)
        // API 정상 응답을 받은 후, 27분이 지나면 만료됨
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
        // 이 API 를 사용하여, cache 갱신 주기 (여기에 설정한 시간이 되면, `queryFn` 을 다시 호출하고 cache 를 갱신함)
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
        // 이 프로젝트가 비활성화된 경우 (다른 탭, 프로젝트를 사용중인 경우) 에도, `refetchInterval` 에 설정한 시간마다 cache 를 갱신한다.
        refetchOnReconnect: true,
    });

    useEffect(function onSuccess() {
        if (!isSuccess) {
            return;
        }

        setEncryptStorage(storageKey.REFRESH_TOKEN, data.refreshToken);
        setHeader(
            requestHeaderKey.AUTHORIZATION, 
            `${requestHeaderKey.AUTHORIZATION_PREFIX} ${data.accessToken}`
        );
    }, [isSuccess]);

    useEffect(function onError() {
        if (!isError) {
            return;
        }

        removeHeader(requestHeaderKey.AUTHORIZATION);
        removeEncryptStorage(storageKey.REFRESH_TOKEN);
    }, [isError]);

    return {
        isSuccess,
        isError,
    };
};

const useGetProfile = (queryOptions: UseQueryCustomOptions<ResponseProfile>) => {
    return useQuery({
        queryKey: [queryKey.AUTH, queryKey.GET_PROFILE],
        queryFn: getProfile,
        ...queryOptions,
    });
};

const useLogout = (mutationOptions?: UseMutationCustomOptions) => {
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            removeHeader(requestHeaderKey.AUTHORIZATION);
            removeEncryptStorage(storageKey.REFRESH_TOKEN);
        },
        onSettled: () => {
            // 로그아웃이 되면, `auth` 관련 cache 를 모두 `무효화` 시킨다.
            queryClient.invalidateQueries({
                queryKey: [queryKey.AUTH],
            });
        },
        ...mutationOptions,
    });
};

const useAuth = () => {
    const getRefreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
        // `false` 설정 시, query 의 queryFn 을 호출하지 않음
        enabled: getRefreshTokenQuery.isSuccess,
    });

    const signupMutation = useSignup();
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    const isLogin = getRefreshTokenQuery.isSuccess;

    return {
        getRefreshTokenQuery,
        getProfileQuery,

        signupMutation,
        loginMutation,
        logoutMutation,

        isLogin,
    };
};

export default useAuth;
