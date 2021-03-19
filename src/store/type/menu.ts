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

interface IMenubar {
    parentId?: number | string
    id?: number | string
    name: string
    path: string
    redirect?: string | {name: string}
    meta: {
        icon: string
        title: string
        permission?: Array<string>
        activeMenu?: string
        noCache?: boolean
    }
    hidden?: boolean
}

export interface IMenubarList extends IMenubar {
    // component: (() => Promise<typeof import('*.vue')>)
    component: (() => Promise<typeof import('*.vue')>)
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
