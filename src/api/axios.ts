import axios from 'axios';
import { getToken } from "../services/tokenService";

var api = axios.create({
    baseURL: "https://aok.erpstok.com",
    headers: {
        "Content-Type": "application/json"
    },
});

//runs auto before every request, gets token and attaches header
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//export api calls in a single object
export const out = {

    login: async (password: string) => {
        const response = await api.post("/api/login", {
            email: "demo@example.com",
            password
        });
        return response.data;
    },

    users: {
        get: async (page = 1) => {
            const response = await api.get("api/users", {
                params: {
                    page,
                    limit: 20
                },
            });
            return response.data;
        },
        update: async (id: string, userData: any) => {
            const response = await api.put(
                `/api/users/${id}`, userData
            ); 
            return response.data;
        },
        add: async (id: string, userData: any) => {
            const response = await api.post(
                "/api/users",
                userData
            );
            return response.data;
        },
        delete: async (id: string) => {
            const response = await api.delete(
                `/api/users/${id}`
            );
            return response.data;
        }
    },

    tags: {
        get: async () => {
            const response = await api.get("/api/tags");
            return response.data;
        },
    },
};

