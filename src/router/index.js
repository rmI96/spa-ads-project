import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/pages/Login';
import Registration from "@/pages/Registration";
import Orders from "@/pages/Orders";
import New from "@/pages/New";
import List from "@/pages/List";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/registration',
            component: Registration
        },
        {
            path: '/orders',
            component: Orders
        },
        {
            path: '/new',
            component: New
        },
        {
            path: '/list',
            component: List
        }

    ],
    mode: 'history'
})