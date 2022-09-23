import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Space, Table, Button, Modal, Switch, Tag } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { error, success, warning } from '../../../compoments/Message/Message';
import { useHistory } from 'react-router-dom';

export default function AuditNews() {


    const currentUserInfo = JSON.parse(localStorage.getItem('token'))

    const [dataSource, setDataSource] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const history = useHistory(null)

    const idMapToTagText = ['未审核', '审核中', '已通过', '未通过']
    const idMapToTagColor = ['orange', 'orange', 'green', 'red']

    useEffect(() => {
        console.log(currentUserInfo);

        axios({
            method: 'get',
            url: `http://localhost:8000/news?auditState=1&_expand=category`
        }).then(res => {
            let data = currentUserInfo.roleId === 1 ?
                //如果roleId=1(登录用户是超级管理员),筛选出作者是自己的和其他超级管理员发布的新闻
                //如果roleId=2(当前登录用户是区域管理员).筛选出作者是自己的和当前区域下区域编辑发布的新闻
                [...res.data.filter(item => item.author === currentUserInfo.username), ...res.data.filter(item => item.roleId !== 1)] :
                [...res.data.filter(item => item.author === currentUserInfo.username), ...res.data.filter(item => { return item.roleId === 3 && item.region === currentUserInfo.region })]
            console.log(data);
            setDataSource(data)
        }).catch((res) => {
            console.log(res.data);
        })
    }, [])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/categories'
        }).then(res => {
            setCategoryList(res.data)
        })
    }, [])


    const handleChangeBtn = (record, auditState) => {
        console.log(record);
        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${record.id}`,
            data: {
                auditState: auditState,
                publishState: auditState === 2 ? 1 : 0
            }
        }).then(res => {
            console.log(res.data);

            axios({
                method: 'get',
                url: `http://localhost:8000/news?auditState=1&_expand=category`
            }).then(res => {
                let data = currentUserInfo.roleId === 1 ?
                    //如果roleId=1(登录用户是超级管理员),筛选出作者是自己的和其他超级管理员发布的新闻
                    //如果roleId=2(当前登录用户是区域管理员).筛选出作者是自己的和当前区域下区域编辑发布的新闻
                    [...res.data.filter(item => item.author === currentUserInfo.username), ...res.data.filter(item => item.roleId !== 1)] :
                    [...res.data.filter(item => item.author === currentUserInfo.username), ...res.data.filter(item => { return item.roleId === 3 && item.region === currentUserInfo.region })]
                console.log(data);
                setDataSource(data)
            }).catch((res) => {
                console.log(res.data);
            })

        })
    }

    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'region',
            width: 400,
            render: (_, item) => {

                return <a onClick={() => {
                    console.log(item.id);
                    history.push(`/news-manage/preview/${item.id}`)
                }}>{item.title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
            width: 200,
        },
        {
            title: '新闻分类',
            key: 'categoryId',
            width: 200,
            render: (_, item) => {
                return <p>{categoryList.length === 0 ? null : categoryList[item.categoryId - 1].value}</p>
            }
        },

        {
            title: '操作',
            key: 'action',
            render: (_, record) => {


                return (<Space>
                    <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick={() => { handleChangeBtn(record, 2) }} />
                    <Button type="primary" danger shape="circle" icon={<CloseOutlined />} onClick={() => { handleChangeBtn(record, 3) }} />
                </Space>

                )
            }
        },
    ];

    return (
        <div>
            <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} rowKey={(item) => {
                return item.id
            }} />
        </div>
    )
}
