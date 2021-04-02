import request from '/@/utils/request'
import { AxiosPromise } from 'axios'
import { JsonMenu } from '/@/store/type/menu'


export function getMenu(): AxiosPromise {
  return request({
    url: '/menus',
    method: 'get'
  })
}

export function saveMenu(data: JsonMenu): AxiosPromise {
  return request({
    url: '/menus',
    method: 'post',
    data
  })
}
