export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
    token: string | null = null
): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const res = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers,
    });

    if (!res.ok) {
        // Try to parse JSON error first
        let errorMessage: string;
        try {
            const errorJson = await res.json();
            errorMessage = errorJson.message || JSON.stringify(errorJson);
        } catch {
            errorMessage = await res.text();
        }
        throw new Error(`API error ${res.status}: ${errorMessage}`);
    }

    return res.json();
}