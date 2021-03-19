import { ITheme } from '/@/store/type/theme'
import changeTheme from '/@/utils/changeTheme'
import themeStyle from '/@/config/theme'


const state:ITheme = {
  theme: localStorage.getItem('theme') ? Number(localStorage.getItem('theme')) : 0
}


const mutations = {
  // 修改主题
  changeTheme(state: ITheme, num?:number):void {
    if (num === state.theme) return
    if (typeof num !== 'number') num = state.theme
    if (num >= themeStyle.length) num = 0
    changeTheme(num)
    state.theme = num
    localStorage.setItem('theme', String(num))
  }
}


const actions = {
}


const themeState = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default themeState
