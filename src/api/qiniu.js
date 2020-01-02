import request from '@/utils/request'

const qiNiuUrl = 'http://upload.qiniup.com/putb64/-1/'
export function getToken () {
  return request.get(
    '/qiniu/upload/token' // 假地址 自行替换
  )
}

export function qiniuUpload ({ keyname, data, upToken }) {
  console.log('', { keyname, data, upToken })
  return request.common({
    url: qiNiuUrl + 'key/' + keyname,
    method: 'post',
    source: 'qiniu',
    data,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Authorization': 'UpToken ' + upToken
    }
  })
}
