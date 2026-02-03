import { NextResponse } from "next/server";
import { apiFetch } from "../http";
import { User } from "@/common/interfaces/User";
import { getTokenCookie } from "../getTokenCookie";

export const API_ALIAS_NAME = 'users';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const token = getTokenCookie(req);

        // Use PATCH instead of POST
        const data = await apiFetch<User>(`/${API_ALIAS_NAME}`, {
            method: "POST",
            body: JSON.stringify(body),
        }, token);

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
        const keyword = searchParams.get("keyword") || "";
        const token = getTokenCookie(req);

        const data = await apiFetch<User[]>(
            `/${API_ALIAS_NAME}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
            { method: "GET" }, token);
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Unable to fetch" }, { status: 500 });
    }
}

