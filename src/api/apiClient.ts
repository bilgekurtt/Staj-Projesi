//entry point for all http communication with the backend
//its purpose: manage the axios instance and config, register interceptors

import axios from 'axios';
import { getToken } from "../services/tokenService";

export const apiClient = axios.create({
    baseURL: "https://aok.erpstok.com",
    headers: {
        "Content-Type": "application/json"
    },
});

//runs auto before every request, gets token and attaches header
apiClient.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});
