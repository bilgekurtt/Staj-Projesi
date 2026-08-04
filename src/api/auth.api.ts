//entry point for api calls related to auth
//its purpose: call api, return data

import { apiClient } from "./apiClient";

export async function login(password : string) {
    const { data } = await apiClient.post("/api/login", {
        email: "demo@example.com",
        password,
    });

    return data;
}