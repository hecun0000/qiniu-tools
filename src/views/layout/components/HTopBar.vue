<template>
  <div class="h-top-bar drag">
    <ul class="tool">
      <li class="no-drag" @click="min">
        <i class="iconfont icon-minus active"></i>
      </li>
      <!-- <li class="no-drag" @click="toggle">
        <i class="iconfont icon-arrawsalt"></i>
      </li> -->
      <li class="no-drag" @click="close">
        <i class="iconfont icon-close"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { ipcRenderer, remote } from 'electron'
export default {
  name: 'HTopBar',
  data () {
    return {
      isMax: false
    }
  },
  methods: {
    close () {
      ipcRenderer.send('close')
    },
    max () {
      ipcRenderer.send('max')
    },
    min () {
      ipcRenderer.send('min')
    },
    reset () {
      console.log(remote.getCurrentWindow(), 'dsdddd')
      remote.getCurrentWindow().setSize(1000, 666)
    },
    toggle () {
      console.log(this.isMax, 'ismax')
      if (this.isMax) {
        ipcRenderer.send('reset')
      } else {
        this.max()
      }
      this.isMax = !this.isMax
    }

  }
}
</script>

<style lang="scss" scoped>
.h-top-bar {
  display: flex;
  justify-content: flex-end;
  ul {
    display: flex;
    margin: 10px;
    .iconfont {
      font-size: 16px;
      cursor: pointer;
      font-weight: 100;
      color: #71807c;
    }
    li {
      margin-left: 8px;
    }
  }
}
</style>
