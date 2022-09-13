import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
UsergroupAddOutlined,









} from '@ant-design/icons';



import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';

const { Sider } = Layout;

const mapPathToIcon = {
  '/home': <HomeOutlined />,
  '/user-manage': <UserSwitchOutlined />,
  '/user-manage/list': <IdcardOutlined />,
    '/right-manage':
  '/right-manage/role/list':
  '/right-manage/right/list': <DeploymentUnitOutlined />
    '/news-manage':< DesktopOutlined />
  '/news-manage/draft': <FolderOpenOutlined />
    '/news-manage/category':< ReconciliationOutlined />
  '/audit-manage': <ToolOutlined />
    '/audit-manage/audit':< UnlockOutlined />,
  '/audit-manage/list': <SecurityScanOutlined />,
    '/publish-manage':< SearchOutlined />,
  '/publish-manage/unpublished': <SelectOutlined />,
    '/publish-manage/published':< ToTopOutlined /> ,
  '/publish-manage/sunset': <DownloadOutlined />

}


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
  }, [])

  const history = useHistory()

  const handleMenuClick = (params) => {
    console.log(params);
    history.push(params)

  }


  const checkPagepermisson = (item) => {
    return item.pagepermisson === 1
  }


  const renderMenu = (menuList) => {

    const renderMenuList = menuList.map((item) => {

      if (item.children && item.children.length !== 0) {
        return checkPagepermisson(item) ? <Menu.SubMenu key={item.key} title={item.title} onClick={() => { handleMenuClick(item.key) }}>
          {
            renderMenu(item.children)
          }
        </Menu.SubMenu> : null
      }
      return checkPagepermisson(item) ? <Menu.Item key={item.key} onClick={() => { handleMenuClick(item.key) }} >{item.title}</Menu.Item> : null

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
