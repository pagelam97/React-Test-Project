import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '../../compoments/sideMenu/SideMenu';
import TopHeader from '../../compoments/topHeader/TopHeader';
import Home from './home/Home';
import NotFound from './notFound/NotFound';
import RightList from './right-manage/RightList';
import RoleList from './right-manage/RoleList';
import UserList from './user-manage/UserList';

export default function NewsSandBox(props) {

  return (
    <div>
      <SideMenu />
      <TopHeader />


      <Switch>
        <Route path={'/home'} component={Home} />
        <Route path={'/user-manage/list'} component={UserList} />
        <Route path={'/right-manage/role/list'} component={RoleList} />
        <Route path={'/right-manage/right/list'} component={RightList} />
        <Redirect from={'/'} to={'/home'} exact />
        <Route path={'*'} component={NotFound} />
      </Switch>



    </div>
  )
}
