import React, { useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';

import Home from './home/Home';
import NotFound from './notFound/NotFound';
import RightList from './right-manage/RightList';
import RoleList from './right-manage/RoleList';
import UserList from './user-manage/UserList';

import AuditNews from './audit-manage/AuditNews';
import AuditNewsList from './audit-manage/AuditNewsList'

import AddNews from './news-manage/AddNews'
import CategoryNews from './news-manage/CategoryNews'
import DraftNews from './news-manage/DraftNews'
import PreviewNews from './news-manage/PreviewNews'
import UpdataNews from './news-manage/UpdataNews'

import UnpublishedNews from './publish-manage/UnpublishedNews'
import PublishedNews from './publish-manage/PublishedNews'
import SunsetNews from './publish-manage/SunsetNews'

import './NewsSandBox.css'

import axios from 'axios';



const PathMapToComponent = {
    '/home': Home,
    '/user-manage/list': UserList,
    '/right-manage/role/list': RoleList,
    '/right-manage/right/list': RightList,
    '/news-manage/add': AddNews,
    "/news-manage/draft": DraftNews,
    "/news-manage/preview/:id": PreviewNews,
    "/news-manage/update/:id": UpdataNews,
    '/news-manage/category': CategoryNews,
    "/audit-manage/audit": AuditNews,
    "/audit-manage/list": AuditNewsList,
    "/publish-manage/unpublished": UnpublishedNews,
    "/publish-manage/published": PublishedNews,
    "/publish-manage/sunset": SunsetNews,
}



export default function NewRoute(props) {

    const [backRouteList, setBackRouteList] = useState([])

    const currentUserInfo = JSON.parse(localStorage.getItem('token'))
    const currentUserRole = currentUserInfo.role

    console.log('currentUserInfo--->', currentUserInfo);
    console.log('currentUserRole--->', currentUserRole);


    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8000/rights'),
            axios.get('http://localhost:8000/children')
        ]).then(res => {
            console.log(res);
            let list = [...res[0].data, ...res[1].data]
            console.log(list);
            setBackRouteList(list)
        })

    }, [])

    const checkPagepermisson = (item) => {
        return item.pagepermisson === 1
    }

    const isCurrentAuth = (item) => {
        return currentUserRole.rights.includes(item.key)
    }

    const checkRoutepermisson = (item) => {
        return item.routepermisson === 1
    }


    return (

        <Switch>

            {backRouteList.map((item) => {

                let isRenderRouter = ((checkPagepermisson(item) || checkRoutepermisson(item)) && isCurrentAuth(item))

                return isRenderRouter ? <Route path={item.key} key={item.id} component={PathMapToComponent[item.key] || NotFound} exact /> : null
            })}

            <Redirect from={'/'} to={'/home'} exact />
            {backRouteList.length > 0 ? <Route path={'*'} component={NotFound} /> : null}
        </Switch>


    )
}

