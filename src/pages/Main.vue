<template>
  <main id="main">
    <router-view></router-view>
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="favorite" md-active @click="navigate('you')">You</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="school" @click="navigate('learn')">Learn</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="shopping_cart" @click="navigate('shop')">Shop</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="spa" @click="navigate('service')">Service</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="settings" @click="navigate('settings')">Settings</md-bottom-bar-item>
    </md-bottom-bar>
  </main>
</template>

<script>
import router from '../router'

export default {
  name: 'Main',
  data () {
    return {
    }
  },
  methods: {
    navigate (route) {
      router.push(route)
    }
  }
}
</script>

<style lang="scss">
#main {
  min-height: 100%;
  padding: 20px 20px 56px;
  background: #F6F6F6;

  .md-theme-default.md-bottom-bar.md-fixed {
    background: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }

  .md-bottom-bar-item {
    min-width: 50px;
  }
}
</style>
