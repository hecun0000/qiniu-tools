<template>
  <ul class="he-tabs">
    <li v-for="(item, index) in tabs" :key="index" :class="{active: active === item.value}" @click="toggle(item)">
      {{ item.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tabs',
  data () {
    return {
      active: 'url',
      tabs: [
        {
          label: 'Markdown',
          value: 'markdown'
        },
        {
          label: '图片链接',
          value: 'url'
        },
        {
          label: 'web',
          value: 'html'
        }
      ]
    }
  },
  methods: {
    toggle (item) {
      this.active = item.value
      this.$emit('toggle', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.he-tabs {
  display: flex;
  justify-content: center;
  li {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    vertical-align: middle;
    background: $layout-bg;
    border: 1px solid $main-color;
    font-weight: 500;
    border-left: 0;
    color: $menu-default-color;
    text-align: center;
    position: relative;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 0;
    &:first-child {
      border-radius: 4px 0 0 4px;
      border-left: 1px solid $main-color;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
    }
    &.active {
      background: $main-color;
      color: $menu-active-color;
    }
  }
}
</style>
