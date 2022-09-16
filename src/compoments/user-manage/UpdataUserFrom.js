import React, { useEffect, useState, forwardRef } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';


const { Option } = Select;
const UpdataUserFrom = forwardRef(
    (props, ref) => {

        console.log(props.currentItem);
        console.log(props.currentUserInfo);

        const { currentUserInfo } = props

        const [roleList, setRoleList] = useState([])
        const [region, setRegion] = useState([])
        const [isRegionDisable, setIsRegionDisable] = useState(false)
        const [isRoleDisable, setIsRoleDisable] = useState(false)

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

        useEffect(() => {
            // console.log(props.currentItem);
            ref.current.setFieldsValue({ ...props.currentItem })
            props.currentItem.role.roleType === 1 ? setIsRegionDisable(true) : setIsRegionDisable(false)

            if (currentUserInfo.role.roleType === 2) {
                setIsRegionDisable(true)
            } else if (currentUserInfo.role.roleType === 3) {
                setIsRegionDisable(true)
                setIsRoleDisable(true)
            }
        }, [props])


        const handleRoleTypeChange = (value, item) => {
            console.log(value);
            console.log(item);

            if (currentUserInfo.role.roleType === 1) {
                if (value === 1) {
                    setIsRegionDisable(true)
                    ref.current.setFieldValue('region', '')
                } else {
                    setIsRegionDisable(false)
                }
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
                    <Select
                        disabled={isRoleDisable}
                        onChange={(value, item) => {
                            handleRoleTypeChange(value, item)
                        }}>
                        {
                            roleList.map((item) => {
                                console.log(item);
                                let isDisable = false

                                if (currentUserInfo.role.roleType === 2 && item.roleType === 1) {
                                    isDisable = true
                                }

                                return (
                                    <Option value={item.roleType} key={item.id} disabled={isDisable}>{item.roleName}</Option>
                                )
                            })

                        }
                    </Select>
                </Form.Item>
            </Form>
        )

    }
)




export default UpdataUserFrom