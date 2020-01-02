<template>
    <div class="fall">
      <div class="fall-column" v-for="(column, idx) in allBox" :key="idx">
        <div class="fall-column-item" v-for="(item, i) in column" :key="i">
          <img class="fall-column-item-img" :src="item.src" />
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'water',
  data () {
    return {
      list: [],
      Masonry: null,
      waterfallList: [],
      waterfallImgWidth: 0,
      waterfallImgCol: 3,
      waterfallImgRight: 10,
      waterfallImgBottom: 10,
      waterfallDeviationHeight: [],
      heightArr: [],
      allBox: []
      // imgList: []
    }
  },
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    col: {
      type: Number,
      default: 3
    }
  },
  watch: {
    imgList: {
      async handler () {
        await this.initData()
        console.log(this.allBox, 'all')
        console.log(this.heightArr, 'arr')
      },
      deep: true
    }
  },
  methods: {
    getImgInfo (src) {
      return new Promise(resolve => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          console.log(img, 'orgin-img')
          const { width, height } = img
          console.log({ width, height }, 'dddddd')
          resolve({ width, height: height / width })
        }
      })
    },
    // 获取下标
    getIndex (arr, val) {
      for (const i in arr) {
        if (arr[i] === val) {
          return i
        }
      }
    },
    async initData () {
      const col = this.col
      for (const [i, imgItem] of this.imgList.entries()) {
        // 获取图片信息
        const imgInfo = await this.getImgInfo(imgItem.src)
        console.log(imgInfo)
        const boxHeight = imgInfo.height
        if (i < col) {
          this.heightArr.push(boxHeight) // 把第一行高度都添加进去
          this.allBox.push([imgItem])
        } else {
          // 选出高度较矮的一列的索引
          const minHeight = Math.min.apply(null, this.heightArr)
          const minHeightIndex = this.heightArr.indexOf(minHeight)
          this.allBox[minHeightIndex].push(imgItem)
          this.heightArr[minHeightIndex] += imgInfo.height
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fall {
  display: flex;
}

.fall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.fall-column ~ .fall-column {
  margin-left: 10px;
}

.fall-column-item {
  position: relative;
  line-height: 0;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all .3s ease-in-out;
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  img {
    width: 100%;
  }
}
.fall-column-item ~ .fall-column-item {
    margin-top: 10px;
  }
</style>
