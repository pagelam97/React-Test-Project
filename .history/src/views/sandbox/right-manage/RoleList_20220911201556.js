import React, { useEffect, useState } from 'react'


import { Space, Table, Button, Modal, Tree } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';





export default function RoleList() {


  const [isModelShow, setIsModelShow] = useState(false)
  const [currentItem, setCurrentItem] = useState({})
  const [dataSource, setDataSource] = useState([])
  const [RightList, setRightList] = useState([])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/roles'
    }).then((res) => {
      setDataSource(res.data)
      console.log(res.data);
    })
  }, [])

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/rights?_embed=children'
    }).then((res) => {
      setRightList(res.data)
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

  const handleDeleteBtn = (item) => {
    console.log(item);
  }


  const handleChangeBtn = (item) => {
    console.log(item);
    setCurrentItem(item)
    setIsModelShow(true)
  }

  const hideModal = () => {
    setCurrentItem({})
    setIsModelShow(false)
  }

  const handleCheck = (list) => {
    console.log(list);
    let newCurrentItem = { ...currentItem, rights: list }
    console.log(newCurrentItem);
    setCurrentItem(newCurrentItem)
  }

  const handleOkBtn = () => {

    axios({
      method: 'patch',
      url: `http://localhost:8000/roles/${currentItem.id}`,
      data: { rights: currentItem.rights }
    }).then(() => {

      axios({
        method: 'get',
        url: 'http://localhost:8000/roles'
      }).then((res) => {
        setDataSource(res.data)
        console.log(res.data);
      })
    })
    hideModal()
  }

  return (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} rowKey={(item) => {
        return item.id + '-' + item.roleType
      }} />
      <Modal
        title="权限分配"
        visible={isModelShow}
        onOk={handleOkBtn}
        onCancel={hideModal}
        okText="确认修改"
        cancelText="取消修改"
      >
        {
          <div>
            {currentItem.id}
            <Tree
              checkable
              checkedKeys={currentItem.rights}
              treeData={RightList}
              onCheck={handleCheck}
            />
          </div>
        }
      </Modal>
    </>



  )
}
