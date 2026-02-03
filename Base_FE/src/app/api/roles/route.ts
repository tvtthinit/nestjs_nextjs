import { NextResponse } from "next/server";
import { apiFetch } from "../http";
import { Role } from "@/common/interfaces/Role";
import { getTokenCookie } from "../getTokenCookie";

export const API_ALIAS_NAME = 'roles';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Use PATCH instead of POST
        const data = await apiFetch<Role>(`/${API_ALIAS_NAME}`, {
            method: "POST",
            body: JSON.stringify(body),
        }, getTokenCookie(req));

        return NextResponse.json(data);
    } catch (err) {
        console.error("POST failed:", err);
        return NextResponse.json(
            { error: "Unable to update" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    try {
        const page = Math.max(Number(searchParams.get("page")) || 1, 1);
        const pageSize = Math.min(Math.max(Number(searchParams.get("pageSize")) || 10, 1), 100);
        const data = await apiFetch<Role[]>(`/${API_ALIAS_NAME}?page=${page}&pageSize=${pageSize}`, { method: "GET" }, getTokenCookie(req));

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Unable to fetch" }, { status: 500 });
    }
}
