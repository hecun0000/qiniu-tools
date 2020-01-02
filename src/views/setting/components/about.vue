<template>
  <div class="about he-form">
    <img src="http://static.hecun.site/hecun.321c947a.jpg" class="avatar" alt />
    <p class="name">hecun</p>
    <p class="desc">生命不息 奋斗不止</p>
    <div class="contact">
      <span class="span-a" @click="openUrl('https://github.com/hecun0000')">Github</span>
      <span class="span-a" @click="openUrl('http://hecun.site/')">Blog</span>
      <span class="span-a" @click="openUrl('https://juejin.im/user/599783bcf265da24975fd79f')">掘金</span>
    </div>
  </div>
</template>

<script>
import { openUrl } from '@/utils/tools'
export default {
  name: 'about',
  data () {
    return {}
  },
  methods: {
    openUrl
  }
}
</script>

<style lang="scss" scoped>
.about {
  padding-top: 16px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  margin: 20px auto;
  &:hover {
    transform: rotate(666turn);
    transition-delay: 1s;
    transition-property: all;
    transition-duration: 59s;
    transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
  }
}

.name {
  font-size: 24px;
}

.desc {
  font-size: 12px;
  margin: 16px 0;
}

.contact {
  display: flex;
  justify-content: center;
  .span-a {
    color: $main-color;
    cursor: pointer;
  }
  .span-a ~ .span-a {
    margin-left: 10px
  }
}
</style>
