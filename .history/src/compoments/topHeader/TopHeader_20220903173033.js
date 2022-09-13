import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import React, { useState } from 'react'
import { Layout,Avatar } from 'antd';
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

<span style={{float:'right'}}>
  大叔大婶多
</span>



      <span style={{ float: 'right',lineHeight:'64px'}}>
        <Avatar size={50} icon={<UserOutlined />} style={{ float: 'right' }} />
      </span>



    </Header>
  )
}
