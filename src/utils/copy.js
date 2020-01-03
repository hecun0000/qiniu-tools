import {
  typeOf,
  notification
} from './tools'

function copySrc (text) {
  var oInput = document.createElement('input')
  oInput.value = text
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.className = 'oInput'
  oInput.style.display = 'none'
}

function getSrc ({ src, fileName }, type) {
  switch (type) {
    case 'url':
      return src
    case 'markdown':
      return `![${fileName}](${src})`
    case 'html':
      return `<img src="${src}" alt="${fileName}">`
    default:
      return src
  }
}

export function copyPath (arr, type) {
  if (typeOf(arr) !== 'array') arr = [arr]
  console.log(arr, type)
  let str = ''
  arr.forEach(item => {
    str += getSrc(item, type)
  })

  return copySrc(str)
}

/**
 * 复制链接并通知
 * @param {*} arr 数据信息
 * @param {*} type 链接类型
 */
export function copyNotice (arr, type) {
  if (typeOf(arr) !== 'array') arr = [arr]
  copyPath(arr, type)
  if (arr.length > 1) {
    let option = {
      title: '温馨提示',
      body: '图片链接已批量复制到剪贴板'
    }
    notification(option, false)
    console.log(arr)
  } else {
    const src = arr[0].src
    let option = {
      title: '温馨提示',
      body: '图片链接已复制到剪贴板',
      icon: src,
      href: src
    }
    notification(option, true)
    console.log(src, arr)
  }
}
