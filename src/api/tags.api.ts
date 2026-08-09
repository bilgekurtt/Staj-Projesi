//entry point for api calls related to tags
//its purpose: call api, return data

import { apiClient } from "./apiClient";

export async function getTags() {
    const { data } = await apiClient.get("/api/tags");

    return data;
}

export async function addTag(name: string) {
    const { data } = await apiClient.post("/api/tags", { name });

    return data;
}

export async function updateTag(id: string, name: string) {
    const { data } = await apiClient.put(`/api/tags/${id}`, { name });

    return data;
}

export async function deleteTag(id: string) {
    const { data } = await apiClient.delete(`/api/tags/${id}`);

    return data;
}
