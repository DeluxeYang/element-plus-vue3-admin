import { IMenubarList } from '../type/menu'
import router from '/@/router/index'
import { ITags, ITagsList } from '../type/tags'
import { setLocal, useLocal, getLocal } from '/@/utils/tools'


const state:ITags = {
  tagsList: [],
  cachedViews: [],
  showTags: localStorage.getItem('showTags') ? Boolean(localStorage.getItem('showTags')) : true
}

const mutations = {
  // 切换导航，记录打开的导航
  changeTagNavList(state: ITags, cRouter:IMenubarList):void {
    if (new RegExp(/\/redirect\//).test(cRouter.path)) return       // 判断是否是重定向页面
    if (!state.showTags) return // 判断是否开启多标签页
    const index = state.tagsList.findIndex(v => v.path === cRouter.path)
    state.tagsList.forEach(v => v.isActive = false)
    // 判断页面是否打开过
    if (index !== -1) {
      state.tagsList[index].isActive = true
      return
    }
    const tagsList:ITagsList = {
      name: cRouter.name,
      title: cRouter.meta.title,
      path: cRouter.path,
      isActive: true
    }
    state.tagsList.push(tagsList)
  },
  removeTagNav(state: ITags, obj:{tagsList:ITagsList, cPath: string}):void {
    const index = state.tagsList.findIndex(v => v.path === obj.tagsList.path)
    if (state.tagsList[index].path === obj.cPath) {
      state.tagsList.splice(index, 1)
      const i = index === state.tagsList.length ? index - 1 : index
      state.tagsList[i].isActive = true
      mutations.removeCachedViews(state, { name: obj.tagsList.name, index })
      router.push({ path: state.tagsList[i].path })
    } else {
      state.tagsList.splice(index, 1)
      mutations.removeCachedViews(state, { name: obj.tagsList.name, index })
    }
  },
  removeOtherTagNav(state: ITags, tagsList:ITagsList):void {
    const index = state.tagsList.findIndex(v => v.path === tagsList.path)
    state.tagsList.splice(index + 1)
    state.tagsList.splice(0, index)
    state.cachedViews.splice(index + 1)
    state.cachedViews.splice(0, index)
    router.push({ path: tagsList.path })
  },
  removeAllTagNav(state: ITags):void {
    state.tagsList.splice(0)
    state.cachedViews.splice(0)
    router.push({ path: '/redirect/' })
  },
  // 添加缓存页面
  addCachedViews(state: ITags, obj: {name: string, noCache: boolean}):void {
    if (!state.showTags) return // 判断是否开启多标签页
    if (obj.noCache || state.cachedViews.includes(obj.name)) return
    state.cachedViews.push(obj.name)
  },
  // 删除缓存页面
  removeCachedViews(state: ITags, obj: { name: string, index: number }):void {
    // 判断标签页是否还有该页面
    if (state.tagsList.map(v => v.name).includes(obj.name)) return
    state.cachedViews.splice(obj.index, 1)
  },
  changeTagsSetting(state: ITags, showTags:boolean):void {
    state.showTags = showTags
    localStorage.setItem('showTags', JSON.stringify(state.showTags))

    if (showTags) {
      const index = state.tagsList.findIndex(v => v.path === router.currentRoute.value.path)
      console.log(index)
      if (index !== -1) {
        state.tagsList.forEach(v => v.isActive = false)
        state.tagsList[index].isActive = true
      } else {
        // @ts-ignore
        mutations.changeTagNavList(state, router.currentRoute.value)
      }
    }
  }
}


const tagsState = {
  namespaced: true,
  state,
  mutations
}

export default tagsState
