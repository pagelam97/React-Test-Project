import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from '../views/login/Login'


export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            <Route path={'./login'} component={}/>
        </Switch>
    </HashRouter>
  )
}
