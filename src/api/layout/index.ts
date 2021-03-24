import request from '/@/utils/request'
import { AxiosPromise } from 'axios'
import { store } from '/@/store'
import md5 from 'md5'


export interface loginParam {
    username: string,
    password: string
}

export function login(param: loginParam): AxiosPromise {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username: param.username,
      password: md5(param.password)
    }
  })
}

export function getUser(): AxiosPromise {
  return request({
    url: '/getUser',
    method: 'get'
  })
}

export function getRouterList(): AxiosPromise {
  return request({
    url: '/info',
    method: 'get'
  })
}
