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
export const getUserProfile = () => {
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user) user返回的是json格式的字符串 需要用JSON.parse将字符串变成对象
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 后端需要把需要授权的用户身份放到请求头中
    // axios 可以用过 headers 设置请求头
    // headers: {
    //   // 属性名和属性值都得看接口的要求
    //   // 属性名：Authorization， 接口要求的
    //   // 属性值：Bearer 空格 token数据
    //   Authorization: `Bearer ${user.token}` // Es6反引号$字符串拼接
    // }
  })
}
// 修改用户信息
