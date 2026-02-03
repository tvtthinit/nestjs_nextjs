"use client";

import { Table, Button, Modal, Form, Input, Popconfirm, Select } from "antd";
import { useEffect, useState } from "react";
import { User } from "../../common/interfaces/User";
import api from "../../common/utils/fetcher";
import { Role } from "@/common/interfaces/Role";
import { formatDate } from "@/common/utils/formatDate";
import { Option } from "antd/es/mentions";
import { tokenStorage } from "@/common/lib/token";
const { Search } = Input;


export default function UsersTable() {
    const [data, setData] = useState<User[]>([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<User | null>(null);
    const [form] = Form.useForm();
    const [searchKeyword, setSearchKeyword] = useState("");

    const [roles, setRoles] = useState<Role[]>([]);

    // Fetch roles from API when modal opens
    const fetchDataRoles = async (page = 1, pageSize = 1000, keyword = "") => {
        setLoading(true);
        const res = await api.get(`/roles?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
        const roleOptions = res.data.data.map((role: any) => ({
            value: role.id,   // can be number or string
            label: role.name,
        }));
        setRoles(roleOptions);
        setLoading(false);
    };

    useEffect(() => {
        fetchDataRoles();
    }, [isModalOpen]);


    const fetchData = async (page = 1, pageSize = 5, keyword = "") => {
        setLoading(true);
        const res = await api.get(`/users?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
        setData(res.data.data);
        setPagination({ current: page, pageSize, total: res.data.total });
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleEdit = (record: User) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        await api.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenStorage.get()}`,
                "Content-Type": "application/json",
            },
        });
        fetchData(pagination.current, pagination.pageSize);
    };

    const handleSave = async () => {
        const values = await form.validateFields();
        if (editingRecord) {
            await api.patch(`/users/${editingRecord.id}`, values, {
                headers: {
                    Authorization: `Bearer ${tokenStorage.get()}`,
                    "Content-Type": "application/json",
                },
            });

        } else {
            await api.post(`/users`, values);
        }
        setIsModalOpen(false);
        fetchData(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "index",
            render: (_: unknown, __: User, index: number) =>
                (pagination.current! - 1) * pagination.pageSize! + index + 1,
        },
        { title: "Username", dataIndex: "username", sorter: true },
        { title: "Email", dataIndex: "email" },
        {
            title: "Role",
            dataIndex: "role",
            render: (role: Role) => role?.name, // ✅ explicitly typed
        },
        {
            title: "Create At",
            dataIndex: "created_at",
            render: (value: string) => formatDate(value),
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            render: (value: string) => formatDate(value),
        },
        {
            title: "Actions",
            render: (_: any, record: User) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
                Add User
            </Button>
            <Search
                placeholder="Search users..."
                allowClear
                onSearch={(value) => {
                    setSearchKeyword(value);
                    fetchData(1, pagination.pageSize, value); // reset to page 1 when searching
                }}
                style={{ width: 300, marginBottom: 16 }}
            />

            <Table
                columns={columns}
                rowKey="id"
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={(pagination) =>
                    fetchData(pagination.current!, pagination.pageSize!, searchKeyword)
                }
            />

            <Modal
                title={editingRecord ? "Edit User" : "Add User"}
                open={isModalOpen}
                onOk={handleSave}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            { required: true, message: "Username is required" },
                            { min: 4, message: "Username must be at least 4 characters" },
                            {
                                pattern: /^[a-zA-Z0-9_]+$/,
                                message: "Username can only contain letters, numbers, and underscores"
                            }
                        ]}
                    >
                        <Input placeholder="Enter your username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Email is required" },
                            { type: "email", message: "Please enter a valid email address" }
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item name="password" label="Password"
                        rules={[
                            { required: true, message: "Password is required" },
                            { min: 8, message: "Password must be at least 8 characters" },
                            {
                                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                message: "Password must include at least one uppercase letter, one number, and one special character"
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role_id"
                        label="Role"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="Select a role"
                            options={roles}
                        />
                    </Form.Item>
                </Form>
            </Modal >
        </>
    );
}