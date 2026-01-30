"use client";

import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Header } from "antd/es/layout/layout";

const { Sider, Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [selectedTab, setSelectedTab] = useState("users");
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        window.location.href = "/login"; // redirect to login page
    };

    const pathname = usePathname();
    if (pathname.startsWith("/admin")) {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        position: "fixed",
                        top: 0,
                        width: "100%",
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <nav>
                        <Link href="/">Books</Link>
                    </nav>
                    <div>
                        {token ? (
                            <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <Link href="/login">Login</Link>
                        )}
                    </div>
                </Header>
                <Layout style={{ marginTop: 64 }}> {/* push content below fixed header */}
                    <Sider>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[selectedTab]}
                            onClick={(e) => setSelectedTab(e.key)}
                            items={[
                                { key: "users", icon: <UserOutlined />, label: <Link href="/admin">Users</Link> },
                                { key: "roles", icon: <UserOutlined />, label: <Link href="/admin/roles">Roles</Link> },
                                { key: "books", icon: <UserOutlined />, label: <Link href="/admin/books">Books</Link> },
                            ]}
                        />
                    </Sider>
                    <Layout>
                        <Content style={{ margin: "16px" }}>{children}</Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

    if (pathname.startsWith("/login")) {
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        position: "fixed",
                        top: 0,
                        width: "100%",
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <nav>
                        <Link href="/">Books</Link>
                    </nav>
                </Header>
                <Layout style={{ marginTop: 64 }}> {/* push content below fixed header */}
                    <Layout>
                        <Content style={{ margin: "16px" }}>{children}</Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Header
                style={{
                    position: "fixed",
                    top: 0,
                    width: "100%",
                    zIndex: 1000,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <nav>
                    <Link href="/">Books</Link>
                </nav>
                <div>
                    {token ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link href="/login">Login</Link>
                    )}
                </div>
            </Header>
            <Layout style={{ marginTop: 64 }}> {/* push content below fixed header */}
                <Layout>
                    <Content style={{ margin: "16px" }}>{children}</Content>
                </Layout>
            </Layout>
        </Layout>
    );
}