"use client";

import { Table, Button, Modal, Form, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Role } from "../../common/interfaces/Role";
import api from "../../common/utils/fetcher";
import { formatDate } from "@/common/utils/formatDate";
import { tokenStorage } from "@/common/lib/token";

export default function RolesTable() {
    const [data, setData] = useState<Role[]>([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 5, total: 0 });
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState<Role | null>(null);
    const [form] = Form.useForm();

    const fetchData = async (page = 1, pageSize = 5) => {
        setLoading(true);
        const res = await api.get(`/roles?page=${page}&pageSize=${pageSize}`);
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

    const handleEdit = (record: Role) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        await api.delete(`/roles/${id}`, {
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
            await api.patch(`/roles/${editingRecord.id}`, values, {
                headers: {
                    Authorization: `Bearer ${tokenStorage.get()}`,
                    "Content-Type": "application/json",
                },
            });
        } else {
            await api.post(`/roles`, values);
        }
        setIsModalOpen(false);
        fetchData(pagination.current, pagination.pageSize);
    };

    const columns = [
        {
            title: "No.",
            dataIndex: "index",
            render: (_: unknown, __: Role, index: number) =>
                (pagination.current! - 1) * pagination.pageSize! + index + 1,
        },

        { title: "Name", dataIndex: "name", sorter: true },
        { title: "Description", dataIndex: "description" },
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
            render: (_: any, record: Role) => (
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
                Add Role
            </Button>
            <Table
                columns={columns}
                rowKey="id"
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={(pagination) =>
                    fetchData(pagination.current!, pagination.pageSize!)
                }
            />

            <Modal
                title={editingRecord ? "Edit Role" : "Add Role"}
                open={isModalOpen}
                onOk={handleSave}
                onCancel={() => setIsModalOpen(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}