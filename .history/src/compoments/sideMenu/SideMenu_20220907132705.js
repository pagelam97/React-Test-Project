import {
  HomeOutlined,
  UserSwitchOutlined,
  IdcardOutlined,
  FileUnknownOutlined,
  EyeInvisibleOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  FolderOpenOutlined,
  ReconciliationOutlined,
  ToolOutlined,
  UnlockOutlined,
  SecurityScanOutlined,
  SearchOutlined,
  SelectOutlined,
  ToTopOutlined,
  DownloadOutlined,
  ContainerOutlined
} from '@ant-design/icons';



import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';

const { Sider } = Layout;

const mapPathToIcon = {
  '/home': <HomeOutlined />,
  '/user-manage': <UserSwitchOutlined />,
  '/user-manage/list': <IdcardOutlined />,
  '/right-manage': <FileUnknownOutlined />,
  '/right-manage/role/list': <EyeInvisibleOutlined />,
  '/right-manage/right/list': <DeploymentUnitOutlined />,
  '/news-manage': < DesktopOutlined />,
  '/news-manage/add': <ContainerOutlined />,
  '/news-manage/draft': <FolderOpenOutlined />,
  '/news-manage/category': < ReconciliationOutlined />,
  '/audit-manage': <ToolOutlined />,
  '/audit-manage/audit': < UnlockOutlined />,
  '/audit-manage/list': <SecurityScanOutlined />,
  '/publish-manage': < SearchOutlined />,
  '/publish-manage/unpublished': <SelectOutlined />,
  '/publish-manage/published': < ToTopOutlined />,
  '/publish-manage/sunset': <DownloadOutlined />

}


export default function SideMenu() {

  const [collapsed, setCollapsed] = useState(false)
  const [menuList, setMenuList] = useState([])
  const history = useHistory()
  const location = useLocation()
  const selectKey = [location.pathname]
  const openKey = "/" + location.pathname.split('/')[1]


  useEffect(() => {

    axios({
      method: 'get',
      url: 'http://localhost:8000/rights?_embed=children'
    }).then((res) => {
      setMenuList(res.data)
    })
  }, [])



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
        return checkPagepermisson(item) ? <Menu.SubMenu key={item.key} title={item.title} icon={mapPathToIcon[item.key]}  >
          {
            renderMenu(item.children)
          }
        </Menu.SubMenu> : null
      }
      return checkPagepermisson(item) ? <Menu.Item key={item.key} onClick={() => { handleMenuClick(item.key) }} icon={mapPathToIcon[item.key]}>{item.title}</Menu.Item> : null

    })
    return renderMenuList
  }

  const handleKeychange = (key) => {
    console.log(key);
  }



  return (


    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="logo" style={{ height: '64px', textAlign: 'center', fontSize: '30px', color: '#ffffff' }} >
          新闻发布系统
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKey}
            defaultOpenKeys={[openKey]}
          >
            {
              menuList.length === 0 ? null : renderMenu(menuList)
            }
          </Menu>
        </div>
      </div>




    </Sider>


  )
}
