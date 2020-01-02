import { typeOf } from './tools'

function copySrc (text) {
  var oInput = document.createElement('input')
  oInput.value = text
  document.body.appendChild(oInput)
  oInput.select() // 选择对象
  document.execCommand('Copy') // 执行浏览器复制命令
  oInput.className = 'oInput'
  oInput.style.display = 'none'
}

function getSrc (src, type) {
  switch (type) {
    case 'url':
      return src
    case 'markdown':
      return `![](${src})`
    case 'html':
      return `<img src="${src}">`
    default:
      return src
  }
}

export function copyPath (arr, type) {
  if (typeOf(arr) !== 'array') arr = [arr]
  let str = ''
  arr.forEach(item => {
    str += getSrc(item.src, type)
  })

  return copySrc(str)
}
