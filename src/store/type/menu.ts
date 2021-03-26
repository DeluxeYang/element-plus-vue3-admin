export enum IMenubarStatus {
    // eslint-disable-next-line no-unused-vars
    PCE,    // 电脑展开
    // eslint-disable-next-line no-unused-vars
    PCN,    // 电脑合并
    // eslint-disable-next-line no-unused-vars
    PHE,    // 手机展开
    // eslint-disable-next-line no-unused-vars
    PHN     // 手机合并
}

export interface JsonMenu {
    id?: number | string
    menu_name: string
    menu_type: number
    path: string
    permission_tag: string
    remark: string
    icon: string
    hidden: boolean
    component: string
    children: Array<JsonMenu>
}

interface IMenubar {
    parentId?: number | string
    id?: number | string
    name?: string
    path: string
    redirect?: string | {name: string}
    meta?: {
        icon: string
        title: string
        permission?: string
        activeMenu?: string
        noCache?: boolean
        buttons?: Array<number>
        type?: number
    }
    hidden?: boolean
}

export interface IMenubarList extends IMenubar {
    // @ts-ignore
    component?: (() => Promise<typeof import('*.vue')>)
    children?: Array<IMenubarList>
}

export interface IMenubarRoute extends IMenubar {
    component: string
    children?: Array<IMenubarRoute>
}

export interface IMenu {
    status: IMenubarStatus
    menuList: Array<IMenubarList>
    isPhone: boolean
}
