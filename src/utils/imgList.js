import CreateDb from './database'

const database = CreateDb.getDb()

/**
 * 获取七牛云 图片列表
 */
export function getQiniuList () {
  return database.get('uploads.qiniu')
}

// 插入 七牛云 数据
export function insertQiniuList (list) {
  if (!Array.isArray(list)) {
    list = [list]
  }
  const hasList = getQiniuList() || []
  const listData = [...hasList, ...list]
  return database.set('uploads.qiniu', listData)
}

export function getImgList () {
  return getQiniuList()
}
