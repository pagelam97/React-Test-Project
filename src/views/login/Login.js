import React from 'react';
import { Button, Form, Input } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './Login.css'
import axios from 'axios';
import { error, success } from '../../compoments/Message/Message';
import { useHistory } from 'react-router-dom';

export default function Login() {

    const history = useHistory()

    const onFinish = (values) => {
        console.log('Success:', values);
        axios({
            method: 'get',
            url: `http://localhost:8000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`
        }).then(res => {
            console.log('success--->', res.data[0]);
            if (res.data.length === 0) {
                error('账号或者密码错误')
            } else {
                success('登录成功')
                let token = JSON.stringify(res.data[0])
                localStorage.setItem('token', token)
                history.push('/home')
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo.errorFields);
    };



    return (

        <div className='login-page'>
            <div className='login-wapper'>
                <div className='login-title'>
                    React新闻发布系统
                </div>
                <Form
                    name="basic"
                    wrapperCol={{
                        offset: 4,
                        span: 16,

                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    className='login-form'
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入合法账号!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入合法密码!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 10,
                            span: 14,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>


    )
}
