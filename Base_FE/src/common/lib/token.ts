const TOKEN_KEY = "token";

export const tokenStorage = {
    get: () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null),
    set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    clear: () => localStorage.removeItem(TOKEN_KEY),
};