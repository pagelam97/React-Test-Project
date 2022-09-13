import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import React, { useState } from 'react'
import { Layout } from 'antd';
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
    </Header>
  )
}
