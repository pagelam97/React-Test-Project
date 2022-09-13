import React from 'react'


import { Space, Table, Tag, Button } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';





export default function RoleList() {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },

    {
      title: 'Action',
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
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];


  const handleDeleteBtn = (item) => {
    console.log(item);
  }


  const handleChangeBtn = (item) => {
    console.log(item);
  }

  return (
    <div>
      <Table columns={columns} dataSource={data} />    </div>
  )
}
