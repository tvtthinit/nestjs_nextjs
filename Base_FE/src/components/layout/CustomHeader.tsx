"use client";

import Link from "next/link";
import { tokenStorage } from "@/common/lib/token";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type CustomHeaderProps = {
    position?: "fixed" | "sticky" | "absolute" | "relative"; // flexible positions
};

export default function CustomHeader({ position = "fixed" }: CustomHeaderProps) {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setToken(tokenStorage.get());
    }, []);

    const handleLogout = () => {
        tokenStorage.clear();
        router.push("/login");
    };

    return (
        <header
            style={{
                position,
                top: 0,
                width: "100%",
                zIndex: 1000,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5rem 1rem",
                background: "#fff",
                borderBottom: "1px solid #eee",
            }
            }
        >
            <nav>
                <Link href="/" > Books </Link>
            </nav>
            <div>
                {
                    token ? (
                        <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer" }
                        }>
                            Logout
                        </button>
                    ) : (
                        <Link href="/login" > Login </Link>
                    )}
            </div>
        </header>
    );
}