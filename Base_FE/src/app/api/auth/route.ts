import { tokenStorage } from "@/common/lib/token";
import { apiFetch } from "../http";

export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const data = await apiFetch<LoginResponse>("/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        tokenStorage.set(data.access_token);
        return data;
    } catch (err) {
        console.error("Login failed:", err);
        throw new Error("Unable to login. Please check your credentials.");
    }
}
export async function getProfile(): Promise<ProfileResponse> {
    return apiFetch("/profile");
}
export function logout() {
    localStorage.removeItem("token");
}