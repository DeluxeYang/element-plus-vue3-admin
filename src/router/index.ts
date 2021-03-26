import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { IMenubarList } from '/@/store/type/menu'


const components = {
  Layout: () => import('/@/layout/index.vue'),
  Redirect: () => import('/@/layout/redirect.vue'),
  NotFound: () => import('/@/views/ErrorPage/404.vue'),
  Workplace: () => import('/@/views/Dashboard/Workplace.vue'),
  Login: () => import('/@/views/User/Login.vue')
}


// 静态路由页面
export const staticRouter:Array<IMenubarList> = [
  {
    name: 'ErrorPage',
    path: '/404',
    meta: { title: '错误页面', icon: 'el-icon-eleme' },
    component: components.Layout,
    redirect: '/ErrorPage/404',
    children: [
      {
        name: '404',
        path: '/404',
        component: components.NotFound,
        meta: { title: '404', icon: 'el-icon-s-tools' }
      }
    ],
    hidden: true
  },
  {
    name: 'Redirect',
    path: '/redirect/:pathMatch(.*)*',
    meta: {
      title: '重定向页面',
      icon: ''
    },
    hidden: true,
    component: components.Redirect
  },
  {
    name: 'Login',
    path: '/login',
    component: components.Login,
    meta: { title: '登录', icon: 'el-icon-eleme' },
    hidden: true
  }
]

const router = createRouter({
  history: createWebHistory(),        // createWebHistory
  routes: <Array<RouteRecordRaw>>staticRouter
})

export default router
