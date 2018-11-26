import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/index',
                    component: resolve => require(['../view/index.vue'], resolve),
                    meta: { title: '首页'}
                },
                {
                    path: '/goodList',
                    component: resolve => require(['../view/goods/goodList.vue'], resolve),
                    meta: { title: '商品列表' }
                },
                {
                    path: '/createGood',
                    component: resolve => require(['../view/goods/createGood.vue'], resolve),
                    meta: { title: '添加商品' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
