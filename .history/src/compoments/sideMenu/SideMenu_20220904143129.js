import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

import { Layout, Menu } from 'antd';

import React, { useState } from 'react'

const { Sider } = Layout;

export default function SideMenu() {

  const [collapsed, setCollapsed] = useState(false)

  const menuList = [{
    key: '/home',
    title: '首页',
    icon: <UserOutlined />,
    children: []
  },
  {
    key: '/user-manage',
    title: '用户管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/user-manage/list',
        title: '用户列表',
        icon: <UserOutlined />,
        children: []
      }
    ]
  },
  {
    key: '/right-manage',
    title: '权限管理',
    icon: <UserOutlined />,
    children: [
      {
        key: '/right-manage/role/list',
        title: '角色权限',
        icon: <UserOutlined />,
        children: []
      }, {
        key: '/right-manage/right/list',
        title: '权限列表',
        icon: <UserOutlined />,
        children: []
      }
    ]
  }
  ]

  const flatMenu = (item) => {

    if (item.children.length !== 0) {
      <Menu.SubMenu key={item.key} title={item.title} icon={item.icon}>
        {item.children.map((item, index) => {
          console.log(item);
          return flatMenu(item)
        })}
      </Menu.SubMenu>
    }
    return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>
  }



  return (


    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/home']}
      >
        {menuList.map((item, index) => {
          // if (item.children.length !== 0) {

          //   return <Menu.SubMenu key={item.key} title={item.title} icon={item.icon}>
          //     {item.children.map((item, index) => {
          //       if (item.children.length !== 0) {
          //         return null
          //       }
          //       return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>
          //     })}
          //   </Menu.SubMenu>
          // }
          // return <Menu.Item key={item.key} icon={item.icon}>{item.title}</Menu.Item>

          return flatMenu(item)

        })}




      </Menu>

    </Sider>


  )
}


          // items={[
          //   {
          //     key: '1',
          //     icon: <UserOutlined />,
          //     label: 'nav 1',
          //   },
          //   {
          //     key: '2',
          //     icon: <VideoCameraOutlined />,
          //     label: 'nav 2',
          //   },
          //   {
          //     key: '3',
          //     icon: <UploadOutlined />,
          //     label: 'nav 3',
          //   },
          // ]}