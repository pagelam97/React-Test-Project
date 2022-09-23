import React from 'react'

import { Table} from 'antd';

import { useHistory } from 'react-router-dom';


export default function NewPublish(props) {

    console.log(props);
    const history = useHistory(null)


    const columns = [
        {
            title: '新闻标题',
            dataIndex: 'title',
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
                return <p>{item.category.value}</p>
            }
        },


        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                return (props.BTN(record))
            }
        },
    ];


    return (
        <div>
            <Table columns={columns} dataSource={props.dataSource} pagination={{ pageSize: 10 }} rowKey={(item) => {
                return item.id
            }} />
        </div>
    )
}
