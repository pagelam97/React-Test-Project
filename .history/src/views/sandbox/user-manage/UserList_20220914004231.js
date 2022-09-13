import React, { useEffect, useRef, useState } from 'react'


import { Space, Table, Button, Modal, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, UserAddOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { error, success, warning } from '../../../compoments/Message/Message';
import UserFrom from '../../../compoments/user-manage/UserFrom'

const { confirm } = Modal

export default function UserList() {

    const addFormRef = useRef(null)
    const updataFormRef = useRef(null)

    const [dataSource, setDataSource] = useState([])
    const [isAddUserModalShow, setIsAddUserModalShow] = useState(false)
    const [isUpdataModalShow, setIsUpdataModalShow] = useState(false)
    const [currentUpdataItem, setcurrentUpdataItem] = useState({})

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

confirm({
    title: '您是否需要删除当前用户?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    okText: '确认删除',
    okType: 'danger',
    cancelText: '取消删除',

    onOk() {
        console.log('OK');
    },

    onCancel() {
        console.log('Cancel');
    },
})


        console.log(item);


    }
    //点击提交修改后触发
    const handleChangeBtn = (item) => {
        console.log(item);
        setIsUpdataModalShow(true)
        setcurrentUpdataItem(item)
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


    const handleAddUserBtn = () => {
        setIsAddUserModalShow(true)
    }

    const hideAddModal = () => {
        setIsAddUserModalShow(false)
    }

    //清空表单
    const cleanForm = () => {
        addFormRef.current.resetFields()
    }
    //点击确认添加
    const handleAddOkBtn = () => {
        addFormRef.current.validateFields().then((res) => {
            console.log(res);
            let newUser = {
                ...res,
                roleState: true,
                default: false
            }
            axios({
                method: 'post',
                url: 'http://localhost:8000/users',
                data: newUser
            }).then((res) => {
                axios({
                    method: 'get',
                    url: 'http://localhost:8000/users?_expand=role'
                }).then((res) => {
                    success('添加成功')
                    setDataSource(res.data)
                    hideAddModal()
                    cleanForm()
                }).catch((res) => {
                    error('添加失败')
                })
            })
            // hideAddModal()
        }).catch((res) => {
            console.log(res);
            warning('请按照提示填写')
        })
        // console.log(addFormRef.current.getFieldValue());

    }
    //取消添加新用户
    const handleAddCancel = () => {
        warning('取消添加新用户')
        hideAddModal()
        cleanForm()
    }

    //隐藏更新表单模态框
    const hideUpdataModal = () => {
        setIsUpdataModalShow(false)
    }
    const handleUpdataOkBtn = () => {
        updataFormRef.current.validateFields().then((res) => {
            console.log(res)
            let newUser = {
                ...res
            }
            axios({
                method: 'patch',
                url: `http://localhost:8000/users/${currentUpdataItem.id}`,
                data: newUser
            }).then((res) => {
                axios({
                    method: 'get',
                    url: 'http://localhost:8000/users?_expand=role'
                }).then((res) => {
                    success('添加成功')
                    setDataSource(res.data)
                    hideUpdataModal()
                }).catch((res) => {
                    error('更新失败')
                })
            }).catch(() => {
                error('更新失败')
            })
        }).catch((res) => {
            warning('请按照提示填写表单')
        })
    }

    const handleUpdataCancel = () => {
        warning('取消更新')
        hideUpdataModal()
    }

    return (
        <>
            <div style={{ margin: '0px 0px 10px 0px' }}>
                <Button type="primary" icon={<UserAddOutlined />} onClick={() => { handleAddUserBtn() }}>
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
                <UserFrom ref={addFormRef} />
            </Modal>

            <Modal
                title="更新用户信息"
                visible={isUpdataModalShow}
                onOk={handleUpdataOkBtn}
                onCancel={handleUpdataCancel}
                okText="确认更新"
                cancelText="取消更新"
            >
                <UserFrom ref={updataFormRef} currentItem={currentUpdataItem} />
            </Modal>
        </>
    )
}
