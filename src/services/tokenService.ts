//holds the token, if login succeeds setToken(response.token);

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