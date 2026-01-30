"use client";

import { Form, Input, Button, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function LoginPage() {
    const onFinish = async (values: { email: string; password: string }) => {
        try {
            const res = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) throw new Error("Login failed");

            const data = await res.json();
            localStorage.setItem("token", data.access_token);
            message.success("Login successful!");
            window.location.href = "/dashboard";
        } catch {
            message.error("Invalid credentials");
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