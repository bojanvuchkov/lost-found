import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Authorization': localStorage.getItem("JWT")
    }
})

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("JWT");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        if (error.response.status === 403) {
            localStorage.removeItem("JWT");
            localStorage.removeItem("userId")
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default instance;
