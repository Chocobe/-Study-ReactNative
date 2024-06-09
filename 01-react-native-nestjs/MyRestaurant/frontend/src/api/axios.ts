import axios from 'axios';

const axiosInstance = axios.create({
    // IOS 에서는 `localhost` 로 동작함
    // Android 에서는 `localhost` 로 동작 안함
    baseURL: 'http://localhost:3030',
    withCredentials: true,
});

export default axiosInstance;
