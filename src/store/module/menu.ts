import { getRouterList } from '/@/api/layout'
import { IMenu, IMenubarStatus, IMenubarList, ButtonType } from '../type/menu'
import { staticRouter } from '/@/router'
import { generatorDynamicRouter } from '/@/router/asyncRouter'
import { store } from '/@/store'


const state:IMenu = {
  status: document.body.offsetWidth < 768 ? IMenubarStatus.PHN : IMenubarStatus.PCE,
  menuList: [],
  buttonTypes: [],
  isPhone: document.body.offsetWidth < 768
}


const mutations = {
  changeCollapsed(state: IMenu):void {
    if (state.isPhone) {
      state.status = state.status === IMenubarStatus.PHN ? IMenubarStatus.PHE : IMenubarStatus.PHN
    } else {
      state.status = state.status === IMenubarStatus.PCN ? IMenubarStatus.PCE : IMenubarStatus.PCN
    }
  },
  changeDeviceWidth(state: IMenu):void {
    if (document.body.offsetWidth < 768) {
      state.isPhone = true
      state.status = IMenubarStatus.PHN
    } else {
      state.isPhone = false
      state.status = IMenubarStatus.PCE
    }
  },
  setRoutes(state: IMenu, data: Array<IMenubarList>):void {
    state.menuList = data
  },
  setButtonTypes(state: IMenu, data: Array<ButtonType>):void {
    state.buttonTypes = data
  },
  concatAllowRoutes(state: IMenu):void {
    staticRouter.reverse().forEach(v => state.menuList.unshift(v))
  }
}


const actions = {
  async GenerateRoutes():Promise<void> {
    const res = await getRouterList()
    const { menus, buttonTypes } = res.data.data
    store.commit('menu/setButtonTypes', buttonTypes)
    generatorDynamicRouter(menus)
  }
}


const menuState = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default menuState
