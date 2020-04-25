import CreateDb from './database'
import { qiniuUpload } from '../api/qiniu'
import { timestampToTime } from '../utils/tools'
import { insertQiniuList } from './imgList'
const qiniu = require('qiniu')

/**
 * 获取七牛云配置信息
 */
export function getQiniuConfig () {
  const database = CreateDb.getDb()
  return database.get('setting.qiniu')
}

export function setQiniuConfig (config) {
  const database = CreateDb.getDb()
  return database.set('setting.qiniu', config)
}

/**
 * 获取七牛云的 token
 */
export function getQiniuToken () {
  const { accessKey, secretKey, bucket, domain } = getQiniuConfig()
  console.log({ accessKey, secretKey, bucket, domain })
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: bucket,
    deadline: Math.round(new Date().getTime() / 1000) + 3600,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return {
    token: uploadToken,
    domain,
    bucket
  }
}

/**
 * 上传文件到七牛云
 * @param {*} files 文件
 */
export async function uploadQiniu (files) {
  const { token: upToken, bucket, domain } = getQiniuToken()

  const base64Files = await transformBase64(files, bucket)

  const promiseArr = []
  for (const item of base64Files) {
    const { keyname, base64 } = item
    const key = window.btoa(keyname)
    promiseArr.push(qiniuUpload({ keyname: key, data: base64, upToken }))
  }
  const resArr = await Promise.all(promiseArr)
  const result = resArr.map((item, index) => {
    const { fileName, time } = base64Files[index]
    return {
      src: domain + item.key,
      fileName,
      time
    }
  })
  // 将数据插入缓存
  insertQiniuList(result)
  console.log(result)
  return result
}

/**
 * 将文件转化为 base64
 * @param {*} files 转化的文件
 * @param {*} bucket 区域名
 */
async function transformBase64 (files, bucket) {
  const file2base64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        console.log(this.result, 'dd')
        const base64 = this.result.replace(
          /^data:image\/(jpeg|png|gif);base64,/,
          ''
        )
        console.log(file, 'sssssss')
        const fileName = file.name
        const filetype = fileName.slice(fileName.lastIndexOf('.'))
        const now = Date.now()
        const keyname = bucket +
          now +
          Math.floor(Math.random() * 100) +
          filetype

        console.log(keyname, 'keyname', now)
        resolve({ base64, keyname, fileName, time: timestampToTime(now) })
      }
    })
  }
  const baseDataArr = []
  for (let i = 0; i < files.length; i++) {
    baseDataArr.push(file2base64(files[i]))
  }
  const res = await Promise.all(baseDataArr)
  return res
}
