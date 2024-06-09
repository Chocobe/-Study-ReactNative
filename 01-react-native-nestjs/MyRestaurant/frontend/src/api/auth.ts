import { Category, Profile } from '../types/domain';
import { getEncryptStorage } from '../utils';
import axiosInstance from './axios';

type RequestUser = {
    email: string;
    password: string;
};

const postSignup = async ({
    email,
    password,
}: RequestUser) => {
    const { data } = await axiosInstance.post<void>('/auth/signup', {
        email,
        password,
    });

    return data;
};

type ResponseToken = {
    accessToken: string;
    refreshToken: string;
};

const postLogin = async ({
    email,
    password,
}: RequestUser) => {
    const { data } = await axiosInstance.post<ResponseToken>('/auth/login', {
        email,
        password,
    });

    return data;
};

type ResponseProfile = Profile & Category;

const getProfile = async () => {
    const { data } = await axiosInstance.get<ResponseProfile>('/auth/me');

    return data;
};

const getAccessToken = async () => {
    const refreshToken = getEncryptStorage('refreshToken');

    const { data } = await axiosInstance.get<ResponseToken>('/auth/refresh', {
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });

    return data;
};

const logout = async () => {
    await axiosInstance.post<void>('/auth/logout');

    return;
};

export {
    postSignup,
    postLogin,
    getProfile,
    getAccessToken,
    logout,
};

export type {
    RequestUser,
    ResponseToken,
    ResponseProfile,
};
