<template>
  <div class="layout">
    <h-menu></h-menu>
    <div class="h-main">
      <h-top-bar></h-top-bar>
      <div class="app-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { HMenu, HTopBar } from './components'
export default {
  name: 'layout',
  components: {
    HMenu,
    HTopBar
  },
  methods: {
  }
}
</script>
