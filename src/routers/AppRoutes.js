/**
 * @author: houzhitao
 * @since: 2018-08-09 09:49
 */

import React from 'react';
import { asyncComponent } from "./AsyncComponent";
import { renderRoutes } from "./renderRoutes";

//NotFound 未找到
const NotFound = asyncComponent(() => import('../screens/NotFound'));
//未登录首页的Layout 样式组件
const HeaderLayout = asyncComponent(() => import('../layout/HeaderLayout/HeaderLayout'));
//登录页面
const Login = asyncComponent(() => import('../screens/Login'));

const Home = asyncComponent(() => import('../screens/Home'));

//登录之后的layout 样式组件
const TopLeftLayout = asyncComponent(() => import('../layout/TopLeftLayout'));
//工作安排概况
const JobLog = asyncComponent(() => import('../screens/JobLog'));

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/menu',
        component: TopLeftLayout,
        routes: [
            {
                path: '/menu/jobLogging',
                exact: true,
                component: JobLog
            }
        ]
    },
    {
        path: '*',
        exact: true,
        component: NotFound
    }
];
export default class AppRoutes extends React.Component{
    render(){
        return (<div>{renderRoutes(routes)}</div>)
    }
}
