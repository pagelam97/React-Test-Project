import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';


const { Option } = Select;


export default function UserList() {
    const [roleList, setRoleList] = useState([])
    const [region, setRegion] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/regions'
        }).then((res) => {
            setRegion(res.data)
        })
    }, [])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/roles'
        }).then((res) => {
            setRegion(res.data)
        })
    }, [])





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
                label="用户名"
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
                label="区域"
                name="region"
                rules={[
                    {
                        required: true,
                        message: '请输入您的密码!',
                    },
                ]}
            >
                <Select>
                    <Option value="demo3">Demo3</Option>
                    <Option value="demo2">Demo2</Option>
                    <Option value="demo1">Demo1</Option>
                </Select>
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
