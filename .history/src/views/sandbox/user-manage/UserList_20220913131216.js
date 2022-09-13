import React, { useEffect, useState } from 'react'


import { Space, Table, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { error, success, warning } from '../../../compoments/Message/Message';

export default function UserList() {

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/roles'
    }).then((res) => {
      setDataSource(res.data)
      console.log(res.data);
    })
  }, [])



  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
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
  const handleDeleteBtn = () => {

  }
  //点击提交修改后触发
  const handleChangeBtn = () => {

  }



  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 10 }} rowKey={(item) => {
        return item.id + '-' + item.roleType
      }} />
    </>



  )
}
