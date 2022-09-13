import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';


export default function UserList() {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入您的用户名!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="区域"
                name="region"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请选择所在的区域!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="角色"
                name="role"
                rules={[
                    {
                        required: true,
                        message: '请选择你的角色!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )

}
