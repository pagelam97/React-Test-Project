import React, { useEffect, useState, forwardRef } from 'react'
import {  Form, Input, Select } from 'antd';
import axios from 'axios';



const { Option } = Select;
const UserFrom = forwardRef(
    (props, ref) => {
        const { currentUserInfo } = props
        console.log(currentUserInfo);

        const [roleList, setRoleList] = useState([])
        const [region, setRegion] = useState([])
        const [isRegionDisable, setIsRegionDisable] = useState(false)
        console.log(isRegionDisable);

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


        const handleRoleTypeChange = (value, item) => {
            console.log(value);
            console.log(item);
            if (value === 1) {
                console.log('jihlai1');
                setIsRegionDisable(true)
                ref.current.setFieldValue('region', '')
            } else if (value !== 1 && isRegionDisable) {
                console.log('jihlai2');
                setIsRegionDisable(false)
            }
        }



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
                            message: '请输入您的密码!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="区域"
                    name="region"
                    rules={isRegionDisable ? [] : [
                        {
                            required: true,
                            message: '请选择所在的区域!'
                        },
                    ]}
                >
                    <Select disabled={isRegionDisable}>
                        {
                            region.map((item) => {
                                console.log('item--->', item);
                                let isDisabled = false
                                if (currentUserInfo.role.roleType === 2) {
                                    if (item.value !== currentUserInfo.region) {
                                        isDisabled = true
                                    }
                                }

                                return (
                                    <Option value={item.value} key={item.id} disabled={isDisabled}>{item.value}</Option>
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
                    <Select onChange={(value, item) => {
                        handleRoleTypeChange(value, item)
                    }}>
                        {
                            roleList.map((item) => {
                                let isDisabled = false
                                if (currentUserInfo.role.roleType === 2 && item.roleType === 1) {
                                    isDisabled = true
                                }
                                return (
                                    <Option value={item.roleType} key={item.id} disabled={isDisabled}>{item.roleName}</Option>
                                )
                            })

                        }
                    </Select>
                </Form.Item>
            </Form>
        )

    }
)




export default UserFrom