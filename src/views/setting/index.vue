<template>
  <div class="setting">
    <ul class="slide">
      <li v-for="(item, index) in list" :key="index" :class="{active: display.name===item.name}" @click="toggle(item)">
        {{ item.text }}
      </li>
    </ul>
    <div class="setting-container">
      <component :is="display.component"></component>
    </div>
  </div>
</template>

<script>
import { QiNiu, Download, About, Common } from './components'
export default {
  name: 'setting',
  data () {
    const list = [
      {
        text: '七牛云设置',
        name: 'qiniu',
        component: 'QiNiu'
      },
      {
        text: '通用设置',
        name: 'common',
        component: 'Common'
      },
      // {
      //   text: '设置下载目录',
      //   name: 'download',
      //   component: 'Download'
      // },
      {
        text: '关于作者',
        name: 'about',
        component: 'About'
      }
    ]
    return {
      display: list[0],
      active: 'qiniu',
      displayComponent: 'QiNiu',
      list
    }
  },
  components: {
    QiNiu, Download, About, Common
  },
  methods: {
    toggle (item) {
      this.display = item
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px;
  display: flex;
  align-items: flex-start;
  .slide {
    width: 160px;
    text-align: right;
    padding-right: 20px;
    position: relative;
    // margin-top: 16px;
    &:before {
      content: '';
      position: absolute;
      top: 22px;
      bottom: 22px;
      right: 0;
      width: 2px;
      background: linear-gradient(to bottom,  #ddd, #ddd 3px, transparent 3px, transparent);
      background-size: 100% 6px;
    }
    li {
      line-height: 40px;
      position: relative;
      cursor: pointer;
      &:hover, &.active {
        color: $main-color;
      }
      &:first-child,  &:last-child {
        position: relative;
        &:before {
          content: '.';
          position: absolute;
          font-size: 50px;
          top: -30px;
          line-height: normal;
          right: -25px;
          color: #ddd;
        }
      }

      &.active:before {
        content: '.';
        position: absolute;
        font-size: 81px;
        top: -61px;
        line-height: normal;
        right: -29px;
        color: $main-color;
      }
    }

  }

  .setting-container {
    flex: 1;
    padding: 8px 16px;
  }

}
</style>
