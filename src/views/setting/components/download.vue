<template>
  <div class="download he-form">
    <ul>
      <li>
        <span class="label">下载目录</span>
        <input type="text" v-model="defaultPath"/>
      </li>
    </ul>
  </div>
</template>

<script>
import { remote, app } from 'electron'
import path from 'path'
export default {
  name: 'download',
  data () {
    return {
      userDataPath: '',
      defaultPath: ''
    }
  },
  mounted () {
    this.userDataPath = this.getUserDataPath()

    this.defaultPath = path.join(this.userDataPath, '/downloads')
  },
  methods: {
    getUserDataPath () {
      const APP = process.type === 'renderer' ? remote.app : app
      return APP.getPath('userData')
    }
  }
}
</script>

<style lang="scss" scoped>
.download {
  padding-top: 16px;
}
</style>
