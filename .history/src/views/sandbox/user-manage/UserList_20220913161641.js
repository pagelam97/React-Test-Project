import React, { useEffect, useState } from 'react'


import { Space, Table, Button, Modal, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from 'axios';
import { error, success, warning } from '../../../compoments/Message/Message';

export default function UserList() {

    const [dataSource, setDataSource] = useState([])
    const [isAddUserModalShow, setIsAddUserModalShow] = useState(false)
    const [isUpdataModalShow, setIsUpdataModalShow] = useState(false)

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/users?_expand=role'
        }).then((res) => {
            setDataSource(res.data)
            console.log(res.data);
        })
    }, [])

    const columns = [
        {
            title: '区域',
            dataIndex: 'region',
            render: (_, item) => {
                return item.region === '' ? '全球' : item.region
            }
        },
        {
            title: '角色名称',
            dataIndex: 'roleId',
            key: 'roleId' + 'id',
            render: (_, item) => {
                return item.role.roleName
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username' + 'id',
        },

        {
            title: '用户状态',
            dataIndex: 'roleState',
            render: (_, item) => {
                return (
                    <Switch checked={item.roleState} disabled={item.default}
                        onChange={() => { handleRoleStateChange(item) }}
                    />
                )
            }
        },

        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                return (
                    <Space>
                        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { handleDeleteBtn(record) }} />
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { handleChangeBtn(record) }} />
                    </Space>

                )
            }
        },
    ];
    //点击删除
    const handleDeleteBtn = (item) => {
        console.log(item);
    }
    //点击提交修改后触发
    const handleChangeBtn = (item) => {
        setIsAddUserModalShow(true)
        console.log(item);
    }

    //点击用户状态开关时触发
    const handleRoleStateChange = (item) => {
        console.log(item);
        axios({
            method: 'patch',
            url: `http://localhost:8000/users/${item.id}`,
            data: { roleState: !item.roleState }
        }).then((res) => {
            if (res.status === 200) {
                axios({
                    method: 'get',
                    url: 'http://localhost:8000/users?_expand=role'
                }).then((res) => {
                    setDataSource(res.data)
                    console.log(res.data);
                    success('修改成功')
                })
            } else {
                error('修改失败')
            }
        })
    }
    const hideAddModal = () => {
        setIsAddUserModalShow(false)
    }

    const handleAddOkBtn = () => {
hideAddModal()
    }

    const handleAddCancel = () => {
hideAddModal()
    }

    return (
        <>
            <div style={{ margin: '0px 0px 10px 0px' }}>
                <Button type="primary" icon={<UserAddOutlined />}>
                    新增用户
                </Button>
            </div>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} rowKey={(item) => {
                return item.id + '-' + item.roleType
            }} />
            <Modal
                title="新增用户"
                visible={isAddUserModalShow}
                onOk={handleAddOkBtn}
                onCancel={handleAddCancel}
                okText="增加用户"
                cancelText="取消增加"
            >
                {
                    <div>

                    </div>
                }
            </Modal>
        </>
    )
}
