"use client";

import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import api from "../../common/utils/fetcher";
import { tokenStorage } from "@/common/lib/token";

export default function LoginPage() {
    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const { data } = await api.post("/auth/login", values);

            // validate response
            if (!data?.access_token) {
                throw new Error(data?.message || "Invalid credentials");
            }

            // store token
            tokenStorage.set(data.access_token);

            // set default Authorization header for future requests
            api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;

            message.success("Login successful!");
            window.location.href = "/admin";
        } catch (err: unknown) {
            const errorMessage =
                err instanceof Error ? err.message : "Invalid credentials";
            console.error("Login failed:", err);
            message.error(errorMessage);
        }
    };

    return (
        <div
            style={{
                height: "60vh", // full viewport height
                display: "flex",
                justifyContent: "center", // center horizontally
                alignItems: "center", // center vertically
                background: "#f0f2f5", // Ant Design default background
            }}
        >
            <div
                style={{
                    width: 400,
                    padding: 24,
                    background: "#fff",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login</h2>
                <Form name="login" onFinish={onFinish} layout="vertical">
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}