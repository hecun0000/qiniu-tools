import Datastore from 'lowdb'
import LodashId from 'lodash-id'
import FileSync from 'lowdb/adapters/FileSync'
import path from 'path'
import fs from 'fs-extra'
import { remote, app } from 'electron'

class Db {
  constructor () {
    const APP = process.type === 'renderer' ? remote.app : app
    const STORE_PATH = APP.getPath('userData')
    if (process.type !== 'renderer') {
      if (!fs.pathExistsSync(STORE_PATH)) {
        fs.mkdirpSync(STORE_PATH)
      }
    }

    const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

    this.db = Datastore(adapter)
    this.db._.mixin(LodashId)

    this.initQiniu()
  }

  initQiniu () {
    // 设置七牛云
    if (!this.db.has('setting.qiniu').value()) {
      this.db.set('setting.qiniu', {
        accessKey: 'HzPKzILsKZACzI12Bi-KTONKcoR5X2KyN03HbCLo',
        secretKey: 'k84p2iDti4t6MB1DIsy1MMPTttdl18Ws7NkfHmDb',
        domain: 'https://img.hecun.site',
        bucket: 'hecun'
      }).write()
    }
  }

  read () {
    return this.db.read()
  }

  get (key = '') {
    return this.read().get(key).value()
  }

  set (key, value) {
    return this.read().set(key, value).write()
  }

  has (key) {
    return this.read().has(key).value()
  }

  insert (key, value) {
    return this.read().get(key).insert(value).write()
  }
}

class CreateDb {
  constructor () {
    this.instance = null
  }

  static getDb () {
    if (!this.instance) {
      this.instance = new Db()
    }
    return this.instance
  }
}

export default CreateDb
