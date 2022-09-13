
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Space, Table, Tag } from 'antd';


import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


export default function RightList() {
  const [dataSource, setDataSource] = useState([])


  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/rights?_embed=children'
    }).then((res) => {
      let list = res.data
      list[0].children = null
      setDataSource(list)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // width:150
      // key: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      // width: 150
      // key: 'age',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      width: 300,
      // key: 'address',
      render: (key) => {
        return (
          <Tag color="orange">{key}</Tag>
        )
      }

    },

    {
      title: '操作',
      dataIndex: 'key',
      // width: 150,
      // key: 'address',
      render: (props) => {
        return (
          <div>
            <Space>
              <Button danger shape="circle" icon={<DeleteOutlined />} />
              <Button type="primary" shape="circle" icon={<EditOutlined />} />
            </Space>
          </div>
        )
      }
    },
  ]



  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} indentSize={0} />
    </div>
  )
}
