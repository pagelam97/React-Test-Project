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


  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              管理员admin
            </a>
          ),
        },

        {
          key: '4',
          danger: true,
          label: 'a danger item',
        },
      ]}
    />
  );

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
          欢迎admin回来
        </span>
        <span>
          <Dropdown overlay={menu}>
            <Avatar size={50} icon={<UserOutlined />} />
          </Dropdown>
        </span>
      </div>






    </Header>
  )
}
