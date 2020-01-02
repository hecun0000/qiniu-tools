<template>
  <div class="h-menu drag">
    <img src="http://static.hecun.site/hecun.321c947a.jpg" alt="" class="logo no-drag">
    <ul class="menu">
      <li @click=" jump(item.type)" v-for="(item, index) in list" :key="index" class="no-drag">
        <i class="iconfont" :class="[item.icon, {active: active === item.type}]"></i>
      </li>
    </ul>
    <div class="setting" @click=" jump('setting')">
      <i class="iconfont icon-menu no-drag" :class="[{active: active === 'setting'}]"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'h-menu',
  data () {
    return {
      active: 'upload',
      list: [
        {
          icon: 'icon-upload',
          type: 'upload'
        },

        {
          icon: 'icon-expend',
          type: 'expend'
        },
        {
          icon: 'icon-user',
          type: 'user'
        }

      ]
    }
  },
  methods: {
    jump (type) {
      this.active = type
      this.$router.push({ name: type })
    }
  }

}
</script>

<style lang="scss" scoped>
.iconfont {
  cursor: pointer;
  transition: all .3s linear;
  &.active, &:hover {
    color: $menu-active-color;
  }
}
.h-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  color: $menu-default-color;

  .menu {
    flex: 1;
    padding-top: 40px;
    li {
      margin-bottom: 30px;
    }
    .iconfont {
      font-size: 24px;
    }
  }

  .logo {
    width: 60%;
    border-radius: 4px;
  }

  .setting .iconfont {
    font-size: 24px;
  }
}
</style>
