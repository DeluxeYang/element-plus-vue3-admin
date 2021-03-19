export interface ITagsList {
    name: string
    title: string
    path: string
    isActive: boolean
}

export interface ITags {
    tagsList: Array<ITagsList>
    cachedViews: Array<string>
    showTags: boolean
}
