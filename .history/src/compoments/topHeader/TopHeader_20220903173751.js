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
              1st menu item
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item (disabled)
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: '3',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
              3rd menu item (disabled)
            </a>
          ),
          disabled: true,
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



      <Dropdown overlay={menu}>
        <a onClick={e => e.preventDefault()}>
 
            Hover me
            <DownOutlined />
  
        </a>
      </Dropdown>





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
