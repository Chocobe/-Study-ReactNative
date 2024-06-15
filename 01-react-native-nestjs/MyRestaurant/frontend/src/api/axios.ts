import axios from 'axios';

const axiosInstance = axios.create({
    // IOS 에서는 `localhost` 로 동작함
    // Android 에서는 `localhost` 로 동작 안함
    // baseURL: 'http://localhost:3030',

    // Android 에서는 `http://10.0.2.2:3030` 으로 설정해야 `localhost:3030` 으로 통신할 수 있다.
    baseURL: 'http://10.0.2.2:3030',

    withCredentials: true,
});

export default axiosInstance;
