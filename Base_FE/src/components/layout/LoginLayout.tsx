"use client";

import { Layout } from "antd";
import Link from "next/link";
import { Header } from "antd/es/layout/layout";

const { Content } = Layout;

export default function LoginLayout({ children }: { children: React.ReactNode }) {

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