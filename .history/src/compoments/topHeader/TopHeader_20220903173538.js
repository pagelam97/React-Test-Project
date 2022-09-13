import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined, SmileOutlined
} from '@ant-design/icons';

import React, { useState } from 'react'
import { Layout, Avatar, Dropdown, Menu, Space } from 'antd';
const { Header } = Layout;



export default function TopHeader() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        // height:'2px'
        margin: '0 16px'

      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}

      <div style={{ float: 'right' }}>
        <span>
          大叔大婶多
        </span>
        <span>
          <Avatar size={50} icon={<UserOutlined />} />
        </span>
      </div>






    </Header>
  )
}
