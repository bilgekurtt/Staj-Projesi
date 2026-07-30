//entry point for api calls related to users
//its purpose: call api, return data

import { apiClient } from "./apiClient";

export async function getUsers(page: number) {
    const { data } = await apiClient.get("/api/users", {
        params: {
            page,
            limit: 20,
        },
    });

    return data;
}

export async function addUser(userData: any) {
    const { data } = await apiClient.post("/api/users", userData);

    return data;
}

export async function updateUser(id: string, userData: any) {
    const { data } = await apiClient.put(`/api/users/${id}`, userData);

    return data;
}

export async function deleteUser(id: string) {
    const { data } = await apiClient.delete(`/api/users/${id}`);

    return data;
}