import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Space, Table, Button, Modal, Switch } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined, UserAddOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { error, success } from '../../../compoments/Message/Message';

export default function DraftNews() {

    const [dataSource, setDataSource] = useState([])
    const history = useHistory(null)

    const currentUserInfo = JSON.parse(localStorage.getItem('token'))
    console.log(currentUserInfo);

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:8000/news?author=${currentUserInfo.username}&auditState=0`
        }).then(res => {
            console.log(res.data);
            setDataSource(res.data)
        })
    }, [])

    const handleDeleteBtn = (item) => {
        console.log(item.id);

        axios({
            method: 'delete',
            url: `http://localhost:8000/news/${item.id}`
        }).then(res => {
            console.log(res);
            success('删除成功')
            axios({
                method: 'get',
                url: `http://localhost:8000/news?author=${currentUserInfo.username}&auditState=0`
            }).then(res => {
                console.log(res.data);
                setDataSource(res.data)
            })
        }).catch(res => {
            console.log(res);
            console.error('删除失败');
        })

    }

    const handleChangeBtn = (item) => {
        console.log(item.id);
        history.push(`/news-manage/update/${item.id}`)
    }

    const handleUploadBtn = (item) => {
        console.log(item.id);

        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${item.id}`,
            data: { auditState: 1 }
        }).then(res => {
            history.push('/audit-manage/list')
            success('已提交,请在审核列表中查看')
        }).catch((res) => {
            error('提交到审核列表失败')
            console.log(res);
        })
    }

    const listMapToCategories = ["时事新闻", "环球经济", "科学技术", "军事世界", "世界体育", "生活理财"]

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '新闻标题',
            dataIndex: 'title',
            key: 'title' + 'id',
            render: (_, item) => {
                return <a onClick={() => {
                    console.log(item);
                    history.push(`/news-manage/preview/${item.id}`)
                }}>{item.title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'username' + 'id',
        },

        {
            title: '新闻分类',
            dataIndex: 'categoryId',
            key: 'title' + 'id',
            render: (_, item) => {
                return <p>{listMapToCategories[item.categoryId - 1]}</p>
            }
        },

        {
            title: '操作',
            key: 'action' + 'id',
            render: (_, record) => {
                return (
                    <Space>
                        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { handleDeleteBtn(record) }} />
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { handleChangeBtn(record) }} />
                        <Button type="primary" shape="circle" icon={<UploadOutlined />} onClick={() => { handleUploadBtn(record) }} />
                    </Space>

                )
            }
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} rowKey={(item) => {
                return item.id
            }} />


        </div>
    )
}
