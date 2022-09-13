import React, { useEffect, useState } from 'react'


import { Space, Table, Button, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';





export default function RoleList() {


  const [isModelShow, setIsModelShow] = useState(false)
  const [currentItem, setCurrentItem] = useState('')
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/roles'
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

  const handleDeleteBtn = (item) => {
    console.log(item);
  }


  const handleChangeBtn = (item) => {
    console.log(item);
    console.log(isModelShow);
    setIsModelShow(true)
    setCurrentItem(item)

  }

  const hideModal = () => {
    console.log(isModelShow);
    setIsModelShow(false)
  }

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
      <Modal
        title="权限分配"
        visible={isModelShow}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认修改"
        cancelText="取消修改"
      >
        {
          <div>
            {currentItem.key}
          </div>
        }
      </Modal>
    </>



  )
}
