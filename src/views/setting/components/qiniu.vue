<template>
  <div class="qiniu he-form">
    <p class="info">以下信息请移步至 七牛云官网 - 控制台 查看</p>
    <ul>
      <li>
        <span class="label">AccessKey</span>
        <input :type="disabled? 'password' :'text'" v-model="config.accessKey" :disabled="disabled"/>
      </li>
      <li>
        <span class="label">SecretKey</span>
        <input :type="disabled? 'password' :'text'" v-model="config.secretKey" :disabled="disabled"/>
      </li>
      <li>
        <span class="label">域名</span>
        <input :type="disabled? 'password' :'text'" v-model="config.domain" :disabled="disabled"/>
      </li>
      <li>
        <span class="label">bucket</span>
        <input :type="disabled? 'password' :'text'" v-model="config.bucket" :disabled="disabled"/>
      </li>
      <li class="btn-row" v-if="disabled">
        <button class="he-button primary" @click="handleClick">重新填写</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getQiniuConfig, setQiniuConfig } from '@/utils/qiniu'
export default {
  name: 'qiniu',
  data () {
    return {
      disabled: true,
      config: {
        accessKey: 'HzPKzILsKZACzI12Bi-KTONKcoR5X2KyN03HbCLo',
        secretKey: 'k84p2iDti4t6MB1DIsy1MMPTttdl18Ws7NkfHmDb',
        domain: 'https://static.hecun.site/',
        bucket: 'hecun'
      }
    }
  },
  watch: {
    config: {
      handler (val) {
        setQiniuConfig(val)
      },
      deep: true
    }
  },
  mounted () {
    this.getConfig()
  },
  methods: {
    handleClick () {
      this.disabled = false
      this.config = {
        accessKey: '',
        secretKey: '',
        domain: '',
        bucket: ''
      }
    },
    getConfig () {
      this.config = getQiniuConfig()
      const { accessKey, secretKey } = this.config
      this.disabled = !!(accessKey && secretKey)
    }
  }
}
</script>

<style lang="scss" scoped>
.qiniu {
  .info {
    text-align: center;
    margin-bottom: 10px;
  }
  .btn-row {
    justify-content: center;
  }
}
</style>
