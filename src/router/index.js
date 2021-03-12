import Vue from 'vue';
import Router from 'vue-router';
import AuthGuard from './auth-guard'
import AuthGuardMain from './auth-guard-main'

import Home from "@/components/Home";
import Ad from "@/components/Ads/Ad";
import Login from '@/components/Auth/Login';
import Registration from "@/components/Auth/Registration";
import Orders from "@/components/User/Orders";
import New from "@/components/Ads/New";
import List from "@/components/Ads/List";
import Error from "@/components/404";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            beforeEnter: AuthGuard
        },
        {
            path: '/ad/:id',
            props: true,
            component: Ad,
            beforeEnter: AuthGuard
        },
        {
            path: '/login',
            component: Login,
            beforeEnter: AuthGuardMain
        },
        {
            path: '/registration',
            component: Registration,
            beforeEnter: AuthGuardMain
        },
        {
            path: '/orders',
            component: Orders,
            beforeEnter: AuthGuard
        },
        {
            path: '/new',
            component: New,
            beforeEnter: AuthGuard
        },
        {
            path: '/list',
            component: List,
            beforeEnter: AuthGuard
        },
        {
            path: '*',
            component: Error
        }

    ],
    mode: 'history'
})