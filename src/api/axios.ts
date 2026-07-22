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

//Login endpoint methods

export async function login(password: string) {

    const response = await api.post("/api/login", {
        email: "demo@example.com",
        password
    });

    return response.data;
}

//User endpoint methods

export async function getUsers(page=1) {

    const response = await api.get("/api/users", {
        params: {
            page,
            limit: 20
        },
    });

    return response.data;
}

//Tags endpoint methods

export async function getTags() {

    const response = await api.get("/api/tags", {
    });

    return response.data;
}