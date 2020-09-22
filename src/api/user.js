// 用户相关请求模块

import request from '@/utils/request.js'

// 用户登录

// data 是形参
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
    // data: data data用来设置 POST 的请求体
  })
}
// 获取用户信息

// 修改用户信息
