"use client";

import { Table, Button, Modal, Form, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Role } from "../../common/interfaces/Role";
import api from "../../common/utils/fetcher";

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
        await api.delete(`/roles/${id}`);
        fetchData(pagination.current, pagination.pageSize);
    };

    const handleSave = async () => {
        const values = await form.validateFields();
        if (editingRecord) {
            await api.put(`/roles/${editingRecord.id}`, values);
        } else {
            await api.post(`/roles`, values);
        }
        setIsModalOpen(false);
        fetchData(pagination.current, pagination.pageSize);
    };

    const columns = [
        { title: "Name", dataIndex: "name", sorter: true },
        { title: "Email", dataIndex: "email" },
        { title: "Age", dataIndex: "age", sorter: true },
        { title: "Address", dataIndex: "address" },
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
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="age" label="Age" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}