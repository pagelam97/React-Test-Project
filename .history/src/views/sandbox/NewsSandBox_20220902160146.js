import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import SideMenu from '../../compoments/sideMenu/SideMenu';
import TopHeader from '../../compoments/topHeader/TopHeader';

export default function NewsSandBox(props) {

  console.log(props);

  return (
    <div>
      <SideMenu />
      <TopHeader />
      NewsSandBox


      <Switch>
        <Route path={'/home'} component={Home} />
        <Route path={'/user-manage/list'} component={Home} />
        <Route path={'/right-manage/role/list'} component={Home} />
        <Route path={'/right-manage/right/list'} component={Home} />
        <Redirect from='/' to={'/home'} exact />
        <Route path={'*'} component={NotFound} />
      </Switch>



    </div>
  )
}
