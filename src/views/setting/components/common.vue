<template>
  <div class="common">
    <ul>
      <li @click='toggleCheck' class="check-item">
        <span class="ant-checkbox" :class="{'ant-checkbox-checked': checked}" >
          <input type="checkbox" class="ant-checkbox-input" value="">
          <span class="ant-checkbox-inner"></span>
        </span>
        上传后自动复制链接
      </li>
    </ul>
  </div>
</template>

<script>
import { remote, app } from 'electron'
import path from 'path'
export default {
  name: 'ommon',
  data () {
    return {
      checked: false,
      userDataPath: '',
      defaultPath: ''
    }
  },
  mounted () {
    this.userDataPath = this.getUserDataPath()

    this.defaultPath = path.join(this.userDataPath, '/commons')
  },
  methods: {
    toggleCheck () {
      this.checked = !this.checked
    },
    getUserDataPath () {
      const APP = process.type === 'renderer' ? remote.app : app
      return APP.getPath('userData')
    }
  }
}
</script>

<style lang="scss" scoped>
.common {
  .he-form .label {
    width: 300px;
  }
  .check-item {
    cursor: pointer;
  }
  // 原始样式
  .ant-checkbox {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    top: -0.09em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
    .ant-checkbox-input {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      cursor: pointer;
      opacity: 0;
    }
    .ant-checkbox-inner {
      position: relative;
      top: 0;
      left: 0;
      display: block;
      width: 16px;
      height: 16px;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      border-collapse: separate;
      transition: all .3s;
      &:after {
        position: absolute;
        top: 50%;
        left: 22%;
        display: table;
        width: 5.71428571px;
        height: 9.14285714px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0) translate(-50%, -50%);
        opacity: 0;
        transition: all .1s cubic-bezier(.71, -0.46, .88, .6),opacity .1s;
        content: ' ';
      }
    }
  }
  // 选中
  .ant-checkbox-checked {
    .ant-checkbox-inner {
      background-color: $main-color;
      border-color: $main-color;

      &:after {
        transform: rotate(45deg) scale(1) translate(-50%, -50%);
        opacity: 1;
        transition: all .2s cubic-bezier(.12, .4, .29, 1.46) .1s;
      }
    }

    &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid $main-color;
        border-radius: 2px;
        visibility: hidden;
        animation: antCheckboxEffect .36s ease-in-out;
        animation-fill-mode: backwards;
        content: '';
    }
  }
  // 动画
  @keyframes antCheckboxEffect{
    0%{
      transform:scale(1);
      opacity:.5
    }
    100%{
      transform:scale(1.6);
      opacity:0
    }
  }
}
</style>
