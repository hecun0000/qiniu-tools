<template>
  <div class="download he-form">
    <ul>
      <li>
        <span class="label">下载目录</span>
        <button class="he-button primary" @click="handleSelectDir">重新填写</button>
        <!-- {{ userDataPath }} -->
      </li>
      <li>
        <span class="label"></span>
        <span class="text">
          {{ defaultPath }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { remote, app, ipcRenderer } from 'electron'
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

    ipcRenderer.on('selected-directory', function (event, path) {
      console.log(path)
    })
  },
  methods: {
    getUserDataPath () {
      const APP = process.type === 'renderer' ? remote.app : app
      return APP.getPath('userData')
    },
    handleSelectDir () {
      ipcRenderer.send('open-file-dialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.download {
  padding-top: 16px;
}
</style>
