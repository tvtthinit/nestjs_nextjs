import { NextResponse } from "next/server";
import { apiFetch } from "../http";
import { Role } from "@/common/interfaces/Role";

export const API_ALIAS_NAME = 'routes';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Use PATCH instead of POST
        const data = await apiFetch<any>(`/${API_ALIAS_NAME}`, {
            method: "POST",
            body: JSON.stringify(body),
        });

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
        let data;
        if (id) {
            // fetch single
            data = await apiFetch<Role>(`/${API_ALIAS_NAME}/${id}`, { method: "GET" });
        } else {
            // fetch paginated list
            const page = Math.max(Number(searchParams.get("page")) || 1, 1);
            const pageSize = Math.min(Math.max(Number(searchParams.get("pageSize")) || 10, 1), 100);
            data = await apiFetch<Role[]>(`/${API_ALIAS_NAME}?page=${page}&pageSize=${pageSize}`, { method: "GET" });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Unable to fetch" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();

        // Use PATCH instead of POST
        const data = await apiFetch<any>(`/${API_ALIAS_NAME}`, {
            method: "PATCH",
            body: JSON.stringify(body),
        });

        return NextResponse.json(data);
    } catch (err) {
        console.error("PATCH failed:", err);
        return NextResponse.json(
            { error: "Unable to update" },
            { status: 500 }
        );
    }
}