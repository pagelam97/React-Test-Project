import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined, SmileOutlined
} from '@ant-design/icons';

import React, { useState } from 'react'
import { Layout, Avatar, Dropdown, Menu, Space, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { warning } from '../Message/Message';
const { Header } = Layout;



export default function TopHeader() {


  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory()

  const userInfo = JSON.parse(localStorage.getItem('token'))
  const { username, role } = userInfo

  const handleLoginOutBtn = (e) => {
    e.preventDefault()
    console.log(history);
    localStorage.clear()
    history.replace('/login')
    warning('已退出denglv')
  }


  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" >
              {role.roleName}
            </a>
          ),
        },

        {
          key: '2',
          danger: true,
          label: <a onClick={handleLoginOutBtn}>退出登录</a>,
        },
      ]}
    />
  );

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: '0 16px',
        // height:'2px'
        //margin: '0 16px'

      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}



      <div style={{ float: 'right' }}>
        <span>欢迎回来,</span><span style={{ color: '#448ff8' }}> {username}</span>
        <span>
          <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()}>
              <Avatar size={50} icon={<UserOutlined />} />
            </a>
          </Dropdown>
        </span>
      </div>


    </Header>
  )
}
