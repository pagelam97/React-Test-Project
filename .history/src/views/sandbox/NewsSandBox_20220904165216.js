import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '../../compoments/sideMenu/SideMenu';
import TopHeader from '../../compoments/topHeader/TopHeader';
import Home from './home/Home';
import NotFound from './notFound/NotFound';
import RightList from './right-manage/RightList';
import RoleList from './right-manage/RoleList';
import UserList from './user-manage/UserList';
import './NewsSandBox.css'

import { Layout } from 'antd';
import axios from 'axios';
const { Content } = Layout;


export default function NewsSandBox(props) {

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:8000/posts/4',
      // data: { author:'???????',title:'asdasd'}
    }).then((res) => {
      console.log(res);
    })
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
          <Switch>
            <Route path={'/home'} component={Home} />
            <Route path={'/user-manage/list'} component={UserList} />
            <Route path={'/right-manage/role/list'} component={RoleList} />
            <Route path={'/right-manage/right/list'} component={RightList} />
            <Redirect from={'/'} to={'/home'} exact />
            <Route path={'*'} component={NotFound} />
          </Switch>
        </Content>
      </Layout>

    </Layout>

  )
}
