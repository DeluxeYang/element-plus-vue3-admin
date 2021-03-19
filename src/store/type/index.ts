import { IMenu } from '/@/store/type/menu'
import { ITags } from '/@/store/type/tags'
import { IUser } from '/@/store/type/user'
import { ITheme } from '/@/store/type/theme'


export interface IObject<T> {
    [index: string]: T
}


export interface IState {
    // 左侧导航栏
    menu: IMenu
    // 用户信息
    user: IUser
    // 标签栏
    tags: ITags
    theme: ITheme
    isLoading: boolean
}
