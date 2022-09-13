
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
      console.log(res.data);
      setDataSource(res.data)
    })
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // key: 'name',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      // key: 'age',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      // key: 'address',
    },

    {
      title: '操作',
      dataIndex: 'key',
      // key: 'address',
      render: (props) => {
        console.log(props);
        return (
          <div>
            <Button danger shape="circle" icon={<DeleteOutlined />} />
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
          </div>
        )
      }
    },


  ]



  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}
