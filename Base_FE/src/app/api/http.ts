import { tokenStorage } from "@/common/lib/token";

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = tokenStorage.get();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error ${res.status}: ${errorText}`);
    }

    return res.json();
}