import { login, loginParam, getUser } from '/@/api/layout/index'
import { ActionContext } from 'vuex'
import router from '/@/router/index'
import { IUser } from '/@/store/type/user'
import { IState } from '/@/store/type'


const state:IUser = {
  name: '',
  role: [],
  ACCESS_TOKEN: localStorage.getItem('ACCESS_TOKEN') || ''
}


const mutations = {
  login(state: IUser, token = ''):void {
    state.ACCESS_TOKEN = token
    localStorage.setItem('ACCESS_TOKEN', token)
    router.push({ path: '/' })
  },
  logout(state: IUser):void {
    state.ACCESS_TOKEN = ''
    localStorage.removeItem('ACCESS_TOKEN')
    history.go(0)
  },
  getUser(state: IUser, userInfo:{name:string, role: Array<string>}):void {
    state.name = userInfo.name
    state.role = userInfo.role
  }
}


const actions = {
  async login(context:ActionContext<IState, any>, param: loginParam):Promise<void> {
    const res = await login(param)
    const token = res.data.Data
    context.commit('login', token)
  },
  async getUser(context:ActionContext<IState, any>):Promise<void> {
    const res = await getUser()
    const userInfo = res.data.Data
    context.commit('getUser', userInfo)
  }
}


const userState = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default userState
