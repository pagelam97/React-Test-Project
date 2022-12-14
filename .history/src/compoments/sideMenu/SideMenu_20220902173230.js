import { Layout, Menu } from 'antd';


import React, { useState } from 'react'

const { Header, Sider, Content } = Layout;

export default function SideMenu() {

  const [collapsed, setCollapsed] = useState(false)

  return (
 

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>


  )
}
