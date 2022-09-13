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

  return (
 

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        />

        <Menu.Item>菜单项一</Menu.Item>
        <Menu.Item>菜单项二</Menu.Item>
        <Menu.SubMenu title="子菜单">
          <Menu.Item>子菜单项</Menu.Item>
        </Menu.SubMenu>
 
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