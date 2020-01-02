/**
 * 存储localStorage
 */
import { shell } from 'electron'

/**
 * 判断类型
 * @param {} obj
 */
export function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

/**
 * 深拷贝
 * @param {*} data
 */
export function deepCopy (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

/**
 * 浏览器 打开页面
 *
 * @export
 * @param {*} URL
 */
export function openUrl (URL) {
  shell.openExternal(URL)
}

/**
 * 时间戳 转化为 时间格式
 *
 * @export
 * @param {*} timestamp
 * @returns
 */
export function timestampToTime (timestamp) {
  const date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = change(date.getDate()) + ' '
  const h = change(date.getHours()) + ':'
  const m = change(date.getMinutes()) + ':'
  const s = change(date.getSeconds())
  return Y + M + D + h + m + s
}

function change (t) {
  if (t < 10) {
    return '0' + t
  } else {
    return t
  }
}

/**
 * 打开系统提示 通知
 *
 * @export
 * @param {*} option
 * @param {*} isOpen
 */
export function notification (option, isOpen) {
  const hhwNotication = new window.Notification(option.title, option)
  if (isOpen) {
    // 当通知被点击时, 用默认浏览器打开链接
    hhwNotication.onclick = function () {
      openUrl(option.href)
    }
  }
}
