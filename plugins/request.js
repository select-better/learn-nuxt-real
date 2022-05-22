/*
 请求
*/

import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://api.realworld.io',
})

// 通过插件机制
// 插件导出函数
export default ({ store }) => {
  // 请求拦截器，统一设置token
  request.interceptors.request.use(
    (config) => {
      // 请求就会经过这里
      if (store.state.user?.token) {
        console.log(store.state.user?.token)
        config.headers.authorization = `Token ${store.state.user?.token}`
      }
      return config
    },
    (error) => {
      // 请求没发出去就失败
      return Promise.reject(error)
    }
  )
}

// export default request
