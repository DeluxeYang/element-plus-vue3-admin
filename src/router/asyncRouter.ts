import { IMenubarList, JsonMenu } from '/@/store/type/menu'
import { store } from '/@/store'
const components = {
  Layout: () => import('/@/layout/index.vue'),
  Nested: () => import('/@/views/basic/Nested.vue'),
  NotFound: () => import('/@/views/ErrorPage/404.vue'),
  UserManage: () => import('/@/views/modules/manage/User.vue'),
  RoleManage: () => import('/@/views/modules/manage/Role.vue'),
  MenuManage: () => import('/@/views/modules/manage/Menu.vue')
}

const asyncRouter:Array<IMenubarList> = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // @ts-ignore
    component: components['NotFound'],
    meta: {
      title: 'NotFound',
      icon: ''
    },
    redirect: {
      name: '404'
    },
    hidden: true
  }
]


function convertAsyncRouter(menus:Array<JsonMenu>, isRoot:boolean, path:string): Array<IMenubarList> {
  const routerList:Array<IMenubarList> = []
  for (let i = 0; i < menus.length; i++) {
    const router:IMenubarList = {
      id: menus[i].id,
      name: menus[i].menu_name,
      path: path + '/' + menus[i].path,
      redirect: '',
      meta: {
        icon: menus[i].icon,
        title: menus[i].remark,
        permission: menus[i].permission_tag,
        activeMenu: '',
        noCache: false,
        buttons: [],
        type: menus[i].menu_type
      },
      hidden: menus[i].hidden
    }
    if (isRoot) {
      router.component = components['Layout']
      if (menus[i].menu_type === 1) {
        router.children = [
          {
            path: menus[i].path,
            name: menus[i].menu_name,
            // @ts-ignore
            component: components[menus[i].component],
            meta: {
              title: menus[i].remark,
              icon: menus[i].icon,
              type: menus[i].menu_type
            }
          }
        ]
        delete router.name
      }
    } else if (menus[i].menu_type === 1) {
      // @ts-ignore
      router.component = components[menus[i].component]
    } else {
      router.component = components['Nested']
    }

    if (menus[i].menu_type === 0) {
      router.children = convertAsyncRouter(menus[i].children, false, router.path)
      router.redirect = router.children.length > 0 ? router.children[0].path : '/'
    } else {
      for (let j = 0; j < menus[i].children.length; j++) {
        // @ts-ignore
        router.meta.buttons.push(menus[i].children[j].menu_type)
      }
    }
    routerList.push(router)
  }
  return routerList
}

export const generatorDynamicRouter = (menus:Array<JsonMenu>):void => {
  const routerList:Array<IMenubarList> = convertAsyncRouter(menus, true, '')
  console.log(routerList)
  routerList.push({
    path: '/',
    redirect: routerList[0].redirect ? routerList[0].redirect : routerList[0].path,
    hidden: true
  })
  routerList.push({
    path: '/.*',
    redirect: '/404',
    hidden: true
  })
  store.commit('menu/setRoutes', routerList)
}
