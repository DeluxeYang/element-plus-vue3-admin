import request from '/@/utils/request'
import { AxiosPromise } from 'axios'
import { JsonMenu } from '/@/store/type/menu'

export interface JsonRole {
  id?: number | string
  state: number
  roleName: string
  remark: string
  menu?: Array<JsonMenu>
}


export function getRoles(params: any): AxiosPromise {
  return request({
    url: '/roles',
    method: 'get',
    params: params
  })
}

export function createRole(data: JsonRole): AxiosPromise {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function getRole(id: number): AxiosPromise {
  return request({
    url: `/roles/${id}`,
    method: 'get'
  })
}

export function updateRole(id: number, data: JsonRole): AxiosPromise {
  return request({
    url: `/roles/${id}`,
    method: 'put',
    data
  })
}


export function deleteRole(id: number): AxiosPromise {
  return request({
    url: `/roles/${id}`,
    method: 'delete'
  })
}
