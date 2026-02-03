"use client";

import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomHeader from "./CustomHeader";

const { Sider, Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    // derive selected key from current route
    const selectedKey = pathname.startsWith("/admin/roles")
        ? "roles"
        : pathname.startsWith("/admin/books")
            ? "books"
            : "users";
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <CustomHeader position="fixed" />
            <Layout style={{ marginTop: 64 }}> {/* push content below fixed header */}
                <Sider>
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[selectedKey]}
                        items={[
                            {
                                key: "users",
                                icon: <UserOutlined />,
                                label: <Link href="/admin">Users</Link>,
                            },
                            {
                                key: "roles",
                                icon: <UserOutlined />,
                                label: <Link href="/admin/roles">Roles</Link>,
                            },
                            {
                                key: "books",
                                icon: <UserOutlined />,
                                label: <Link href="/admin/books">Books</Link>,
                            },
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