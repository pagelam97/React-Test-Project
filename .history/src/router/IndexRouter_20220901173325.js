import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
// import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'



export default function IndexRouter() {
    return (
        <div>
            <HashRouter>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/' component={NewsSandBox} />
                    
                </Switch>
            </HashRouter>
        </div>
    )
}


function Login() {
    return (
        <div>Loginss</div>
    )
}
