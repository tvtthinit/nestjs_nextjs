import { NextRequest } from "next/server";

// Before
export function middleware(req: NextRequest) {
    // logic here
}

// After
export function proxy(req: NextRequest) {
    // logic here
}