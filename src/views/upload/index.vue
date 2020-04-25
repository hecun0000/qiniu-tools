<template>
  <div class="upload">
    <tabs ref="tabs" />
    <upload @upload="uploadFiles" />
    <div class="he-form img-info" v-if="url">
      <span class="label">图片链接:</span>
      <span class="span-a" @click="openUrl(url)">{{url}}</span>
    </div>
  </div>
</template>

<script>
import { openUrl } from '@/utils/tools'
import { copyNotice } from '@/utils/copy'
import { uploadQiniu } from '@/utils/qiniu'
import { mapGetters } from 'vuex'

export default {
  name: 'UploadBox',
  data () {
    return {
      list: [],
      url: ''
    }
  },
  computed: {
    ...mapGetters(['autoCopy'])
  },
  methods: {
    async uploadFiles (files) {
      const res = await uploadQiniu(files)
      if (!this.autoCopy) return
      const type = this.$refs.tabs.active
      if (res.length > 0) {
        this.url = res[0].src
      }
      copyNotice(res, type)
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
