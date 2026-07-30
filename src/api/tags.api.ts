//entry point for api calls related to tags
//its purpose: call api, return data

import { apiClient } from "./apiClient";

export async function getTags() {
    const { data } = await apiClient.get("/api/tags");

    return data;
}
