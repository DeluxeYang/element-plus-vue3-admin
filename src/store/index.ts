import { createStore, Store, useStore as baseUseStore } from 'vuex'
import menu from '/@/store/module/menu'
import tags from '/@/store/module/tags'
import user from '/@/store/module/user'
import theme from '/@/store/module/theme'
import { IState } from './type/'


export const store = createStore<IState>({
  modules: {
    menu,
    tags,
    user,
    theme
  },
  getters: {
    menu: state => state.menu,
    perms: state => state.user.perms
  }
})

export function useStore(): Store<IState> {
  return baseUseStore()
}
