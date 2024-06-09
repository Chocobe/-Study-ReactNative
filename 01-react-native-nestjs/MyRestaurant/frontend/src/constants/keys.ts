const queryKey = {
    AUTH: 'auth',
    GET_ACCESS_TOKEN: 'getAccessToken',
    GET_PROFILE: 'getProfile',
} as const;

const storageKey = {
    REFRESH_TOKEN: 'refreshToken',
    ACCESS_TOKEN: 'accessToken',
} as const;

const requestHeaderKey = {
    AUTHORIZATION: 'Authorization',
    AUTHORIZATION_PREFIX: 'Bearer',
} as const;

export {
    queryKey,
    storageKey,
    requestHeaderKey,
};
