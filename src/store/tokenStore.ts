//this file's purpose: store the token

let token = "";

export function setToken(newToken: string) {
    token = newToken;
}

export function getToken() {
    return token;
}

export function clearToken() {
    token = "";
}