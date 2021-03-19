import { createRouter, createWebHashHistory } from 'vue-router'
import { IMenubarList } from '/@/store/type/menu'


const components = {
  Layout: () => import('/@/layout/index.vue'),
  Redirect: () => import('/@/layout/redirect.vue'),
  NotFound: () => import('/@/views/ErrorPage/404.vue'),
  Workplace: () => import('/@/views/Dashboard/Workplace.vue'),
  Login: () => import('/@/views/User/Login.vue')
}


// 静态路由页面
export const allowRouter:Array<IMenubarList> = [
  {
    name: 'Dashboard',
    path: '/',
    // @ts-ignore
    component: components.Layout,
    redirect: '/Dashboard/Workplace',
    meta: { title: '仪表盘', icon: 'el-icon-eleme' },
    children: [
      {
        name: 'Workplace',
        path: '/Dashboard/Workplace',
        // @ts-ignore
        component: components.Workplace,
        meta: { title: '工作台', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    name: 'ErrorPage',
    path: '/ErrorPage',
    meta: { title: '错误页面', icon: 'el-icon-eleme' },
    // @ts-ignore
    component: components.Layout,
    redirect: '/ErrorPage/404',
    children: [
      {
        name: '404',
        path: '/ErrorPage/404',
        // @ts-ignore
        component: components.NotFound,
        meta: { title: '404', icon: 'el-icon-s-tools' }
      }
    ]
  },
  {
    name: 'Redirect',
    path: '/redirect/:pathMatch(.*)*',
    meta: {
      title: '重定向页面',
      icon: '',
      permission: []
    },
    hidden: true,
    // @ts-ignore
    component: components.Redirect
  },
  {
    name: 'Login',
    path: '/Login',
    // @ts-ignore
    component: components.Login,
    meta: { title: '登录', icon: 'el-icon-eleme' },
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),        // createWebHistory
  routes: allowRouter
})

export default router
