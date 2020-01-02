<template>
    <div
      class="upload-box upload-container"
      @dragstart="dragenter($event)"
      @drop="drop($event)"
      @dragover="dragover($event)"
    >
      <div class="info-box">
        <i class="icon iconfont icon-cloud-upload"></i>
        <span class="info-text">将文件拖到此处，或点击后选择文件</span>
      </div>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        class="file"
        multiple="multiple"
        @change="slecetFile"
        title=" "
      >
    </div>
</template>

<script>

export default {
  name: 'Upload',
  data () {
    return {
      list: []
    }
  },
  methods: {
    stopDefault (e) {
      e.stopPropagation()
      e.preventDefault()
    },
    dragenter (e) {
      this.stopDefault(e)
    },

    dragover (e) {
      this.stopDefault(e)
    },

    async drop (e) {
      this.stopDefault(e)
      this.pics = []
      const files = e.dataTransfer.files
      this.$emit('upload', files)
    },
    async slecetFile (e) {
      this.pics = []
      let files = e.target.files
      this.$emit('upload', files)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-box {
  border: 1px dashed #a9a9a9;
  height: 300px;
  margin: 40px auto;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: border-color .3s;
  color: $menu-default-color;
  transition: all .3s linear;
  &:hover {
    border-color: $main-color;
    color: $main-color;
  }
}
.file {
  display: block;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  outline: 0;
  font-size: 20px;
  opacity: 0;
  cursor: pointer;
}

.file:hover {
  background: #aadffd;
  border-color: #78c3f3;
  color: #004974;
  text-decoration: none;
}

.image {
  max-width: 300px;
}

.info-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .icon-cloud-upload {
    display: block;
    font-size: 120px;
  }

  .info-text {
    font-size: 14px;
  }
}

</style>
