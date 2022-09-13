import React from 'react'
import { Route, Switch } from 'react-router-dom';
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
        <Route path={'/home'} component={Home}/>
        <Route path={'/home'} component={Home} />
        <Route path={'/home'} component={Home} />
        <Route path={'/home'} component={Home} />
        <Route path={'/home'} component={Home} />
        <Route />
      </Switch>



    </div>
  )
}
