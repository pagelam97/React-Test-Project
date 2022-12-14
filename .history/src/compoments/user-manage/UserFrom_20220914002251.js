import React, { useEffect, useState, forwardRef } from 'react'
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';


const { Option } = Select;
const UserList = forwardRef(
    (props, ref) => {

        console.log(props.currentItem);

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

        useEffect(() => {
            if (props.currentItem !== undefined) {
                console.log(props);
                ref.current.setFieldsValue({ ...props.currentItem })

                if(props.currentItem.role.roleType===1){
                    setIsRegionDisable(true)
                }
            }

        }, [props])


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
                    label="?????????"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '????????????????????????!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="??????"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '????????????????????????!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="??????"
                    name="region"
                    rules={isRegionDisable ? [] : [
                        {
                            required: true,
                            message: '?????????????????????!',
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
                    label="??????"
                    name="roleId"
                    rules={[
                        {
                            required: true,
                            message: '?????????????????????!',
                        },
                    ]}
                >
                    <Select onChange={(value, item) => {
                        handleRoleTypeChange(value, item)
                    }}>
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