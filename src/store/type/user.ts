export interface IUser {
    name: string,
    role: Array<string>,
    perms: Map<string, Map<number, boolean>>,
    ACCESS_TOKEN: string
}
