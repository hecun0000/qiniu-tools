<template>
  <div class="user">
    <div class="search">
        <div class="search-container">
          <input id="search" v-model="qeury"  placeholder="Search..." />
          <button class="icon" @click="filterData">
            <i class="iconfont icon-search"></i>
          </button>
        </div>
    </div>
    <div class="img-container">
      <water-fall :imgList='displayList'/>
    </div>
  </div>
</template>

<script>
import { waterFall } from './components/'
import { getImgList } from '../../utils/imgList'
import { deepCopy, notification } from '../../utils/tools'
import { copyPath } from '../../utils/copy'

export default {
  name: 'user',
  components: {
    waterFall
  },
  data () {
    return {
      imgList: [],
      displayList: [],
      qeury: ''
    }
  },
  mounted () {
    this.getImgAll()
  },
  methods: {
    getImgAll () {
      const originData = getImgList()
      this.imgList = deepCopy(originData)
      this.displayList = deepCopy(originData)
      console.log(this.displayList)
      copyPath(this.displayList, 'markdown')
      let option = {
        title: '你订阅的《海贼王》更新了',
        body: '《海贼王》已更新至第852集 激斗开幕 路飞VS卡塔库栗',
        icon: '../static/hhw.ico',
        href: 'https://www.iqiyi.com/v_19rqz6uit0.html'
      }
      let notice = notification(option, true)
      console.log(notice)
    },
    filterData () {
      this.displayList = this.imgList.filter(item => {
        return item.fileName.indexOf(this.qeury) > -1
      })
      console.log(this.displayList, 'this.displayList')
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative
}
.img-container {
  overflow-y: auto;
  position: absolute;
  margin: 20px;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
}

.search {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.search-container {
  overflow: hidden;
  width: 50vw;
  vertical-align: middle;
  white-space: nowrap;
  transition: all .3s;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
}

.search-container input#search {
  width: 50vw;
  height: 40px;
  // background: #2b303b;
  border: none;
  font-size: 10pt;
  float: left;
  color: $color-common;
  padding-left: 15px;
  border-radius: 4px;
  outline: 0;
}

.search-container input#search::-webkit-input-placeholder {
  color: #65737e;
}

.search-container button.icon {
  cursor: pointer;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  border: none;
  background: $menu-default-color;
  height: 40px;
  width: 40px;
  color: $menu-active-color;
  opacity: 0;
  font-size: 10pt;
  transition: all 0.55s ease;
}

.search-container:hover button.icon,
.search-container:active button.icon,
.search-container:focus button.icon {
  outline: none;
  opacity: 1;
  margin-left: -40px;
}

.search-container:hover button.icon:hover {
  background: $main-color;
}
</style>
