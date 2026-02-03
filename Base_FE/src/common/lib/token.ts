import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const tokenStorage = {
    get: () => Cookies.get(TOKEN_KEY) || null,
    set: (token: string) =>
        Cookies.set(TOKEN_KEY, token, { expires: 7, secure: true, sameSite: "strict" }),
    clear: () => Cookies.remove(TOKEN_KEY),
};