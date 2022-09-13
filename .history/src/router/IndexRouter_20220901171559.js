import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'



export default function IndexRouter() {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path='./' component={Login} />
                    <Route path='./' component={NewsSandBox} />
                </Switch>
            </HashRouter>
        </div>
    )
}
