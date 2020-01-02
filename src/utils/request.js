import axios from 'axios'
import env from '@/utils/env'

// const MOCKURL = '' // mock数据地址

/**
 * 自定义Axios实例
 */
const service = axios.create({
  baseURL: env.baseUrl,
  timeout: 30000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么，比如400、401、402等等
  if (error && error.response) {
    console.log(error.response)
  }
  return Promise.reject(error)
})

// 定义对外Get、Post、File请求
export default {
  common: service,
  get (url, param = {}, headers = {}) {
    return service.get(url, {
      params: param,
      headers
    })
  },
  post (url, param = null, headers = {}) {
    return service.post(url, param, {
      headers
    })
  },
  put (url, param = null, headers = {}) {
    return service.put(url, param, {
      headers
    })
  },
  file (url, param = null, headers = {}) {
    return service.post(url, param, {
      headers: Object.assign({
        'Content-Type': 'multipart/form-data'
      }, headers)
    })
  },
  delete (url, param = null, headers = {}) {
    return service.delete(url, {
      param,
      headers: Object.assign({
        'Content-Type': 'multipart/form-data'
      }, headers)
    })
  }
}
