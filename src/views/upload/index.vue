<template>
  <div class="upload">
    <tabs @toggle="handleTab" />
    <upload @upload="uploadFiles"/>
    <div class="he-form img-info">
      <span class="label">图片链接: </span>
      <span class="span-a" @click="openUrl('http://static.hecun.site/hecun.321c947a.jpg')">http://static.hecun.site/hecun.321c947a.jpg</span>
    </div>
  </div>
</template>

<script>
import { openUrl } from '@/utils/tools'
import { uploadQiniu } from '@/utils/qiniu'

export default {
  name: 'UploadBox',
  data () {
    return {
      list: []
    }
  },
  methods: {
    async uploadFiles (files) {
      const res = await uploadQiniu(files)
      console.log(res)
    },
    copySrc (item) {
      var oInput = document.createElement('input')
      oInput.value = item
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand('Copy') // 执行浏览器复制命令
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      alert('复制成功')
    },
    handleTab (item) {
      console.log(item)
    },
    openUrl
  }
}
</script>

<style lang="scss" scoped>
.upload {
  padding: 20px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .upload-container {
    margin: 20px 0;
    flex: 1;
  }
  .img-info {
    height: 40px;
  }
  .span-a {
    color: $main-color;
    cursor: pointer;
  }
}
</style>
