import { login, loginParam } from '/@/api/basic/login'
import { ActionContext } from 'vuex'
import router from '/@/router/index'
import { IUser } from '/@/store/type/user'
import { IState } from '/@/store/type'


const state:IUser = {
  name: '',
  role: [],
  perms: new Map(),
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
  setPerms(state: IUser, perms: {perms: string, value: Map<number, boolean>}): void {
    state.perms.set(perms.perms, perms.value)
  }
}


const actions = {
  async login(context:ActionContext<IState, any>, param: loginParam):Promise<void> {
    const res = await login(param)
    const { token } = res.data.data
    context.commit('login', token)
  }
}


const userState = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default userState
