import React, { useEffect } from 'react'
import SideMenu from '../../compoments/sideMenu/SideMenu';
import TopHeader from '../../compoments/topHeader/TopHeader';
import NewRoute from './NewRouter';


import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

import './NewsSandBox.css'
import { Layout } from 'antd';


const { Content } = Layout;


export default function NewsSandBox(props) {
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })


  return (


    <Layout>
      <SideMenu />

      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* <Switch>
            <Route path={'/home'} component={Home} />
            <Route path={'/user-manage/list'} component={UserList} />
            <Route path={'/right-manage/role/list'} component={RoleList} />
            <Route path={'/right-manage/right/list'} component={RightList} />
            <Redirect from={'/'} to={'/home'} exact />
            <Route path={'*'} component={NotFound} />
          </Switch> */}
          <NewRoute />
        </Content>
      </Layout>

    </Layout>

  )
}
