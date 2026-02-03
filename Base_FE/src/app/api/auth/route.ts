import { apiFetch } from "../http";

export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const data = await apiFetch<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        if (!data?.access_token) {
            throw new Error(data?.message || "Login failed");
        }
        return data;
    } catch (err) {
        console.error("Login failed:", err);
        // rethrow with a user-friendly message
        throw new Error("Unable to login. Please check your credentials.");
    }
}

export async function getProfile(): Promise<ProfileResponse> {
    return apiFetch<ProfileResponse>("/profile");
}