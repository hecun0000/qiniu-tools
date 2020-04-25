<template>
  <div class="upload">
    <div class="file-box">
      <div class="left">
        <!-- <span class="item-label">选择裁剪图片</span> -->
        <div class="item-container">
          <input type="file" class="file-input" id="file" @change="handleFileChange" />
          <label for="file" class="file-label">选择图片</label>
        </div>
      </div>

      <div class="right">
        <button class="btn-save" @click="toUpload">确认上传</button>
      </div>
    </div>
    <div class="preview">
      <div class="cilp-box">
        <span class="no-imgs" v-show="!url">
          <span class="no-imgs-text">
            请选择图片
          </span>
        </span>
        <img id="image" v-show="url" :src="url" alt="picture" :class="{'hidden':!croppable}" class="picture" />
      </div>
      <div class="show">
        <span class="span-title">裁剪预览</span>

        <span class="no-imgs" v-show="!url">
          <span class="no-imgs-text">
            请选择图片
          </span>
        </span>
        <div v-show="url" class="show-1 img-preview" :class="{'circle': isCircle}"></div>
      </div>
    </div>
    <div class="operation-box">
      <div class="operation">
        <span class="btn-item btn-rotate-left" title="左旋转" @click="rotate('left')"></span>
        <span class="btn-item btn-rotate-right" title="右旋转" @click="rotate('right')"></span>
        <span class="btn-item btn-l" title="水平翻转" @click="scale(-scaleX, 1)"></span>
        <span class="btn-item btn-v" title="垂直翻转" @click="scale( 1, -scaleY)"></span>
        <span class="btn-item btn-reset" title="重置" @click="reset"></span>
        <!--裁剪质量-->
        <!-- 圆形裁剪 -->
        <!-- <span class="btn-item" @click="circle">圆形</span> -->
      </div>
      <div class="picture-quality">
        <span class="label">压缩等级：</span>
        <el-select
          class="select-quality"
          v-model="imgQuality"
          @change="changeQuality"
          placeholder="请选择"
          size="small"
        >
          <el-option label="高" value="1"></el-option>
          <el-option label="中" value="0.5"></el-option>
          <el-option label="低" value="0.1"></el-option>
        </el-select>
        <template>
          <span class="label">图片大小：</span>
          <span class="content">{{fsize | alterFileSize}}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { copyNotice } from '@/utils/copy'
import { uploadQiniu } from '@/utils/qiniu'
import { mapGetters } from 'vuex'

export default {
  name: 'ccc',
  props: {
    uploadDialog: {
      type: Object,
      default: () => {
        return { visible: false }
      }
    },
    isCircle: {
      // 是否裁剪为圆形
      type: Boolean,
      default: false
    },
    ratio: {
      // 上传图片限制比例 长比宽
      type: String,
      default: '1/1'
    },
    limit: {
      // 限制图片大小---为KB单位
      type: Number,
      default: 0
    }
    // fileUrl: {
    //   default: '',
    //   type: [File, String, Blob]
    // }
  },
  watch: {
    fileUrl: {
      handler (val) {
        this.url = val
        setTimeout(() => {
          if (this.cropper) {
            //  销毁
            this.cropper.destroy()
          }
          this.init()
        }, 300)
      },
      immediate: true
    }
  },

  data () {
    return {
      fileUrl: '',
      file: '',
      dialogVisible: false,
      fileList: [],
      imgUrl: '',
      headerImage: '',
      picValue: '',
      cropper: '',
      croppable: false,
      url: '',
      imageUrl: '',
      form: {},
      imgQuality: '1',
      fsize: '',
      scaleX: '1',
      scaleY: '1',
      blobData: ''
    }
  },
  filters: {
    alterFileSize (size) {
      return (size / 1024).toFixed(2) + 'kb'
    }
  },
  computed: {
    ...mapGetters(['autoCopy'])
  },
  methods: {
    // 文件改变
    handleFileChange (event) {
      const files = event.target.files
      this.file = files
      console.log(files, 's')
      this.fileUrl = this.getObjectURL(files[0])
      console.log(this.fileUrl)
    },
    getObjectURL (file) {
      let url = null
      if (window.createObjectURL) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.URL) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    // 上传图片
    async upload (file) {
      console.log(file, 'file')
      const { name } = this.file
      const files = new File([file], name, { type: file.type, lastModified: Date.now() })
      console.log(files, 'dddd')
      const res = await uploadQiniu([files])
      if (!this.autoCopy) return
      copyNotice(res, 'url')
    },
    // 初始化这个裁剪框
    init () {
      let self = this
      let image = document.getElementById('image')
      // let ratio = this.ratio.split('/')

      this.cropper = new Cropper(image, {
        // aspectRatio: this.isCircle ? 1 / 1 : ratio[0] / ratio[1], // 在默认的时候。可以随意改变裁剪框的大小；我这里的设置的值为 16/9
        viewMode: 1, // 视图模式
        autoCropArea: 0.5,
        background: false, // 容器的网格背景。（就是后面的马赛克）
        zoomable: true, // 是否允许缩放
        preview: '.img-preview', // 预览元素
        // 准备完成执行的函数
        ready: function () {
          self.croppable = true
          self.circle()
          // self.changeQuality()
        }
      })
      // 圆形裁剪
    },
    // 确定裁剪
    changeQuality () {
      let croppedCanvas

      if (!this.croppable) {
        return
      }
      croppedCanvas = this.cropper.getCroppedCanvas({
        imgQuality: 'high'
      })

      // 圆形
      croppedCanvas = this.isCircle
        ? this.getRoundedCanvas(croppedCanvas)
        : croppedCanvas

      let type = Number(this.imgQuality)
      let base64Data = croppedCanvas.toDataURL('image/png', type)

      this.blobData = this.dataURLtoBlob(base64Data)

      this.fsize = this.blobData.size
    },
    async toUpload () {
      this.changeQuality()
      // 验证图片大小
      if (!this.blobData.size) return
      if (!this.limitImg(this.blobData.size)) return
      await this.upload(this.blobData)
      this.$emit('getImgPath', this.imageUrl)
      this.uploadDialog.visible = false
    },
    // 获取圆形图片
    getRoundedCanvas (sourceCanvas) {
      let canvas = document.createElement('canvas')
      let context = canvas.getContext('2d')
      let width = sourceCanvas.width
      let height = sourceCanvas.height
      canvas.width = width
      canvas.height = height
      context.imageSmoothingEnabled = true
      context.drawImage(sourceCanvas, 0, 0, width, height)
      context.globalCompositeOperation = 'destination-in'
      context.beginPath()
      context.arc(
        width / 2,
        height / 2,
        Math.min(width, height) / 2,
        0,
        2 * Math.PI,
        true
      )
      context.fill()
      return canvas
    },
    dataURLtoBlob (dataurl) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    },
    // 旋转
    rotate (type) {
      if (this.cropper) {
        //  销毁
        let deg = type === 'left' ? -45 : 45
        this.cropper.rotate(deg)
      }
    },
    // 翻转
    scale (x, y) {
      if (this.cropper) {
        this.cropper.scale(x, y)
        this.scaleX = -this.scaleX
        this.scaleY = -this.scaleY
      }
    },
    reset () {
      if (this.cropper) {
        this.cropper.reset()
      }
    },
    // 圆形裁剪
    circle () {
      if (this.isCircle) {
        document.querySelector('.cropper-face').classList.add('circle')
      } else {
        document.querySelector('.cropper-face').classList.remove('circle')
      }
    },
    limitImg (size) {
      if (this.limit === 0) return true

      let requireSize = this.limit * 1024

      if (size > requireSize) {
        this.$message.error('上传照片超过限制，请重新选择')
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.preview {
  display: flex;
  height: 420px;
  margin: 0 12px;
}

.preview > div {
  width: 50%;
}

.cilp-box {
  border: 1px solid #eee;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.todo-box {
  margin-top: 20px;
  text-align: center;
}

.show-1 {
  height: 300px;
  margin: 0 auto;
  border: 1px solid #eee;
  overflow: hidden;
}

.show {
  padding: 0 10px;
}

.picture {
  /* max-width: 100%;
                    vertical-align: middle; */

  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  max-width: 100%;
  max-height: 100%;
  transform: translate(-50%, -50%);
}

.operation {
  display: flex;
  margin-top: 10px;
  margin-left: 10px;
  justify-content: center;
}

.operation .btn-item {
  background-color: $main-color;
  width: 32px;
  height: 32px;
  /*padding: 8px;*/
  margin-right: 10px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
}

.operation .btn-item:hover {
  background-color: $main-color;
}

.operation .btn-rotate-left {
  background-size: 60% 60%;
  background-image: url("../../assets/rotate-left.png");
}

.operation .btn-rotate-right {
  transform: rotateY(180deg);
  background-size: 60% 60%;
  background-image: url("../../assets/rotate-left.png");
}

.operation .btn-l {
  background-size: 60% 60%;
  background-image: url("../../assets/l.png");
}

.operation .btn-v {
  background-size: 60% 60%;
  background-image: url("../../assets/v.png");
}

.operation .btn-reset {
  background-size: 60% 60%;
  background-image: url("../../assets/reset.png");
}

.span-title {
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: $main-color;
  border: 1px solid $main-color;
  margin-bottom: 20px;
}

.picture-quality {
  margin-top: 10px;
  margin-left: 36px;
}

.picture-quality .label {
  color: #606266;
}

.select-quality {
  width: 120px;
  margin-right: 6px;
}

.operation-box {
  display: flex;

  /*justify-content: space-between;*/
}

.operation-box > div {
  flex: 1;
}

.file-box {
  margin: 36px 24px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
  }
  .item-label {
    font-size: 14px;
    margin-right: 12px;
  }

  .file-input {
    display: none;
  }
  .file-label {
    background: $main-color;
    color: $page-bg-color;
    padding: 8px 12px;
    font-weight: normal;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }

  .btn-save {
    background: $main-color;
    color: $page-bg-color;
    padding: 8px 12px;
    font-weight: normal;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
    font-size: 14px;
    cursor: pointer;
    outline: 0;
    border: 0;
    &:hover {
      opacity: 0.85;
    }
  }

}
.no-imgs {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #a9a9a9;
    transition: border-color .3s;
    color: $menu-default-color;
    transition: all .3s linear;
    flex: 1;
    border-radius: 4px;
    min-height: 300px;
    &:hover {
      border-color: $main-color;
      color: $main-color;
    }
    .no-imgs-text {
      font-size: 12px;
    }
  }
</style>

<style lang="scss">
.circle {
  border-radius: 50% !important;
}
.cropper-modal {
  background-color: #7d7d7d;
  opacity: 0.16;
}
.cropper-line, .cropper-point {
  background-color: $main-color;
}

</style>
