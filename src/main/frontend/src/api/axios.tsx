import axios from 'axios'

export const BASE_URL = `http://${document.location.hostname}:${document.location.port == '5173' ? 8080 : document.location.port}${import.meta.env.BASE_URL}`

export const instance = axios.create({
    baseURL: `${BASE_URL}/api/v1`,
    timeout: 5000,
    withCredentials: true
})

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.status == 401)
        window.location.href = BASE_URL + '/login';
    return Promise.reject(error);
})