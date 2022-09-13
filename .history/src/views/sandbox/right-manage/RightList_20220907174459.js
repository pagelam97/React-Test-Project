
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


  const handleDeleteBtn = (item) => {
    console.log(item);






    
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',

    },
    {
      title: '权限名称',
      dataIndex: 'title',

    },
    {
      title: '权限路径',
      dataIndex: 'key',
      width: 300,
      render: (key) => {
        return (
          <Tag color="orange">{key}</Tag>
        )
      }

    },

    {
      title: '操作',
      // dataIndex: 'key',
      render: (props) => {

        return (
          <div>
            <Space>
              <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { handleDeleteBtn(props) }} />
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
