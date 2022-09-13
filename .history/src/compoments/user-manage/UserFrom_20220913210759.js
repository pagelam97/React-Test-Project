import React, { useEffect, useState, forwardRef } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';


const { Option } = Select;
const UserList = forwardRef(
    (props, ref) => {
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
                setRoleList(res.data)
            })
        }, [])





        return (
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}

                ref={ref}
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
                        {
                            region.map((item) => {
                                return (
                                    <Option value={item.value} key={item.id}>{item.value}</Option>
                                )
                            })

                        }
                    </Select>
                </Form.Item>



                <Form.Item
                    label="角色"
                    name="roleId"
                    rules={[
                        {
                            required: true,
                            message: '请选择你的角色!',
                        },
                    ]}
                >
                    <Select>
                        {
                            roleList.map((item) => {
                                return (
                                    <Option value={item.roleType} key={item.id}>{item.roleName}</Option>
                                )
                            })

                        }
                    </Select>
                </Form.Item>
            </Form>
        )

    }
)




export default UserList