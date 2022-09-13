import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'


export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            <Route path={'./login'} component={Login}/>
        </Switch>
    </HashRouter>
  )
}
