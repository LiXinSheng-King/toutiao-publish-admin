// 基于axios封装的请求模块

import axios from 'axios'

// 创建一个axios实例，就是复制一个axios
// 通过这个实例去发请求，把需要的配置配置到这个实例里面

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 请求的基础路径
})

// 导出请求模块
export default request

// 谁用谁就加载request模块
// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
