// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from '@ant-design/icons';

import { Layout, Menu } from 'antd';
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const { Sider } = Layout;

export default function SideMenu() {



  const [collapsed, setCollapsed] = useState(false)
  const [menuList, setMenuList] = useState([])


  useEffect(() => {

    axios({
      method: 'get',
      url: 'http://localhost:8000/rights?_embed=children'
    }).then((res) => {
      console.log(res.data);
      setMenuList(res.data)
    })
  })

  const history = useHistory()

  // const menuList = [{
  //   key: '/home',
  //   title: '首页',
  //   icon: <UserOutlined />,
  //   children: []
  // },
  // {
  //   key: '/user-manage',
  //   title: '用户管理',
  //   icon: <UserOutlined />,
  //   children: [
  //     {
  //       key: '/user-manage/list',
  //       title: '用户列表',
  //       icon: <UserOutlined />,
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   key: '/right-manage',
  //   title: '权限管理',
  //   icon: <UserOutlined />,
  //   children: [
  //     {
  //       key: '/right-manage/role/list',
  //       title: '角色权限',
  //       icon: <UserOutlined />,
  //       children: []
  //     }, {
  //       key: '/right-manage/right/list',
  //       title: '权限列表',
  //       icon: <UserOutlined />,
  //       children: []
  //     }
  //   ]
  // }
  // ]

  const handleMenuClick = (params) => {
    console.log(params);
    history.push(params)

  }

  const renderMenu = (menuList) => {

    const renderMenuList = menuList.map((item) => {

      if (item.children.length !== 0) {
        return <Menu.SubMenu key={item.key} title={item.title} icon={item.icon}>
          {
            renderMenu(item.children)
          }
        </Menu.SubMenu>
      }
      return <Menu.Item key={item.key} icon={item.icon} onClick={() => { handleMenuClick(item.key) }} >{item.title}</Menu.Item>

    })
    return renderMenuList
  }



  return (


    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
      >
        {
          menuList.length === 0 ? null : renderMenu(menuList)
        }
      </Menu>
    </Sider>


  )
}
