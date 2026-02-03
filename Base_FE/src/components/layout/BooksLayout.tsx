"use client";

import { Layout } from "antd";
import { useEffect, useState } from "react";
import { tokenStorage } from "@/common/lib/token";
import CustomHeader from "./CustomHeader";

const { Content } = Layout;

export default function BooksLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <CustomHeader position="fixed" />
            <Layout style={{ marginTop: 64 }}> {/* push content below fixed header */}
                <Layout>
                    <Content style={{ margin: "16px" }}>{children}</Content>
                </Layout>
            </Layout>
        </Layout>
    );


}