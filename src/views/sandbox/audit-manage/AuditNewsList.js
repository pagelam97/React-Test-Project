import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Space, Table, Button, Modal, Switch, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, UserAddOutlined, ExclamationCircleOutlined, CloseOutlined, UpSquareOutlined } from '@ant-design/icons';
import { error, success, warning } from '../../../compoments/Message/Message';
import { useHistory } from 'react-router-dom';

export default function AuditNewsList() {


    const currentUserInfo = JSON.parse(localStorage.getItem('token'))

    const [dataSource, setDataSource] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const history = useHistory(null)

    const idMapToTagText = ['未审核', '审核中', '已通过', '未通过']
    const idMapToTagColor = ['orange', 'orange', 'green', 'red']



    useEffect(() => {
        console.log(currentUserInfo.username);

        axios({
            method: 'get',
            url: `http://localhost:8000/news?author=${currentUserInfo.username}&auditState_ne=0&publishState_lte=1`
        }).then(res => {
            console.log(res.data);
            setDataSource(res.data)
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


    const handleRevokeBtn = (record) => {
        console.log(record);

        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${record.id}`,
            data: {
                auditState: 0,
                publishState: 0
            }
        }).then(res => {

            axios({
                method: 'get',
                url: `http://localhost:8000/news?author=${currentUserInfo.username}&auditState_ne=0&publishState_lte=1`
            }).then(res => {
                console.log(res.data);
                setDataSource(res.data)
            })

        }).catch(res => {
            console.log(res);
        })





    }

    const handlePushBtn = (record) => {
        console.log(record);
        axios({
            method: 'patch',
            url: `http://localhost:8000/news/${record.id}`,
            data: {
                publishState: 2,
                publishTime: Date.now()
            }
        }).then(res => {


            axios({
                method: 'get',
                url: `http://localhost:8000/news?author=${currentUserInfo.username}&auditState_ne=0&publishState_lte=1`
            }).then(res => {
                console.log(res.data);
                setDataSource(res.data)
            })


        }).catch(res => {
            console.log(res);
        })
    }

    const handleEditBtn = (record) => {
        console.log(record);
        history.push(`/news-manage/update/${record.id}`)

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
            // render: (_, item) => {
            //     return <a onClick={() => {

            //     }}>{item.title}</a>
            // }
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
            title: '审核状态',
            key: 'auditState',
            width: 200,
            render: (_, item) => {
                return <Tag color={idMapToTagColor[item.auditState]}>{idMapToTagText[item.auditState]}</Tag>
            }
        },



        {
            title: '操作',
            key: 'action',
            render: (_, record) => {


                let com;
                if (record.auditState === 1) {
                    com = <Button type="primary" danger icon={<CloseOutlined />} style={{ backgroundColor: '#ca611e', borderColor: '#fef6e3' }} onClick={() => { handleRevokeBtn(record) }} >撤销</Button>
                } else if (record.auditState === 2) {
                    com = <Button type="primary" icon={<UpSquareOutlined />} style={{ backgroundColor: '#35911d', borderColor: '#f5feeb' }} onClick={() => { handlePushBtn(record) }} >发布</Button >
                } else {
                    com = <Button type="primary" icon={<EditOutlined />} style={{ backgroundColor: '#c41d25', borderColor: '#feefee' }} onClick={() => { handleEditBtn(record) }} >修改</Button >
                }
                return (
                    com
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
