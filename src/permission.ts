import router from '/@/router'
import { store } from '/@/store'
import { configure, start, done } from 'nprogress'
import { RouteRecordRaw } from 'vue-router'

configure({ showSpinner: false })

const loginRoutePath = '/login'
const defaultRoutePath = '/'

router.beforeEach(async (to, from) => {
  start()
  // 判断当前是否在登陆页面
  if (to.path.toLocaleLowerCase() === loginRoutePath.toLocaleLowerCase()) {
    done()
    if (store.state.user.ACCESS_TOKEN) {
      return typeof to.query.from === 'string' ?
        decodeURIComponent(decodeURIComponent(to.query.from)) : defaultRoutePath
    }
    return
  }
  // // 判断是否登录
  if (!store.state.user.ACCESS_TOKEN) {
    return loginRoutePath + (to.fullPath ? `?from=${encodeURIComponent(encodeURIComponent(to.fullPath))}` : '')
  }

  document.title = document.title ?
    <string>document.title.split(' |')[0] + ' | ' + to.meta.title :
    <string>to.meta.title
  // 判断是否还没添加过路由
  if (store.state.menu.menuList.length === 0) {
    await store.dispatch('menu/GenerateRoutes')
    for (let i = 0; i < store.state.menu.menuList.length; i++) {
      router.addRoute(<RouteRecordRaw>store.state.menu.menuList[i])
    }
    store.commit('menu/concatAllowRoutes')
    return to.fullPath
  }
  store.commit('tags/changeTagNavList', to)         // 切换导航，记录打开的导航(标签页)

  // 离开当前页面时是否需要添加当前页面缓存
  !new RegExp(/^\/redirect\//).test(from.path)
        && store.state.tags.tagsList.some(v => v.name === from.name)
        && !store.state.tags.cachedViews.some(v => v === from.name)
        && store.commit('tags/addCachedViews', { name: from.name, noCache: from.meta.noCache })

})

router.afterEach(() => {
  done()
})
