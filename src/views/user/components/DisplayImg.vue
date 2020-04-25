<template>
  <div class="item">
    <div class="info-box">
      <p class="name" :title="data.fileName">{{data.fileName}}</p>
      <p class="time">{{data.time | filterTime}}</p>
    </div>
    <img class="fall-column-item-img" :src="data.src" />
    <div class="copy-box">
      <ul class="buttons">
        <li class="button-item" @click="copy('markdown')">Markdown</li>
        <li class="button-item" @click="copy('url')">图片链接</li>
        <li class="button-item" @click="copy('html')">web</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { copyNotice } from '@/utils/copy'
export default {
  name: 'DisplayImg',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    filterTime (time) {
      return time.indexOf(' ') > -1 ? time.split(' ')[0] : time
    }
  },
  data () {
    return {
      id: Date.now()
    }
  },
  methods: {
    copy (type) {
      copyNotice(this.data, type)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  line-height: normal;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  &:hover .info-box {
    transform: translateY(0);
  }

  &:hover .buttons {
    transform: translateY(0);
  }
  .info-box {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    transform: translateY(-46px);
    transition: all 0.3s ease-in-out;
    background: rgba(#000, .2);
    color: #fff;
    text-align: right;
    padding: 0 8px;
    .name {
      font-size: 14px;
      @include ellipsis(1, 24px);
    }
    .time {
      font-size: 12px;
      @include ellipsis(1, 22px);
    }
  }
}
.buttons {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  text-align: center;
  background: rgba(#000, .2);
  color: #fff;
  padding: 4px 0;
  transform: translateY(40px);
  transition: all 0.3s ease-in-out;
  .button-item {
    flex: 1;
    line-height: 30px;
    transition: all .3s linear;
    &:hover {
      color: $main-color;
    }
  }
  .button-item + .button-item  {
    border-left: 1px solid #eee;
  }
}

</style>
