<template>
  <main id="main">
    <header>
      <h1>{{ this.title }}</h1>
    </header>
    <router-view></router-view>
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="favorite" :md-active="this.$route.path === '/you'" @click="navigate('you')">You</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="school" :md-active="this.$route.path === '/learn'" @click="navigate('learn')">Learn</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="shopping_cart" :md-active="this.$route.path === '/shop'" @click="navigate('shop')">Shop</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="spa" :md-active="this.$route.path === '/service'" @click="navigate('service')">Services</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="face" :md-active="this.$route.path === '/settings'" @click="navigate('settings')">Profile</md-bottom-bar-item>
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
  computed: {
    title () {
      var title = ''
      /* eslint brace-style: ["error", "stroustrup"] */
      if (this.$route.path === '/you') {
        title = 'For You, Emily'
      }
      else if (this.$route.path === '/learn') {
        title = 'Learn'
      }
      else if (this.$route.path === '/shop') {
        title = 'Shop'
      }
      else if (this.$route.path === '/service') {
        title = 'Services'
      }
      else if (this.$route.path === '/settings') {
        title = 'Profile'
      }

      return title
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
  background: #F6F6F6;

  .md-theme-default.md-bottom-bar.md-fixed {
    background: white;
  }

  .md-bottom-bar-item {
    min-width: 50px;
  }
}

header {
  flex: 0 0 69px;
  // border-bottom: 1px solid #DDDDDD;
  padding: 24px 16px;
  background: white;

  h1 {
    display: block;
    font-size: 40px;
    margin: 0 auto;
  }
}

.md-theme-default.md-tabs.md-transparent>.md-tabs-navigation {
  background: white;
}

.container {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.md-theme-default {
  &.md-card {
    flex-direction: row;
    background-color: white !important;
    border-radius: 4px;
    margin-bottom: 16px;
    cursor: pointer;
    min-height: 100px;

    .video-card {
      position: relative;
      width: 100%;
      padding-bottom: calc(56.25% + 60px);
      height: 0;

      .md-icon {
        color: rgba(0, 0, 0, .54);
      }
    }

    .avatar-list {
      position: absolute;
      display: block;
      height: 60px;
      bottom: 0;
      padding-top: 10px;
      padding-left: 16px;
      width: 100%;

      span {
        font-size: 16px;
        margin-left: 8px;
      }

      .md-icon-button {
        position: absolute;
        right: 0;
        bottom: 10px;
      }
    }

    .video {
      position: relative;
      width: 100%;
      padding-bottom: calc(56.25%);
      height: 0;
      padding-top: 60px;

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 60px);
      }
    }

    .column {
      display: flex;
      flex-direction: column;
      margin-right: auto;

      .md-title {
        margin-bottom: 8px;
      }
    }

    .md-card-media {
      flex: 0 0 25%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .md-card-actions {
      .md-icon-button {
        display: block;
      }

      .later {
        display: none;
      }
    }

    @media screen and (max-width: 700px) {
      flex-direction: column;
      min-height: auto;

      .md-card-media {
        flex: 0 0 180px;
        background-size: cover;
      }

      .md-card-actions {
        .md-icon-button {
          display: none;
        }
        .later {
          .md-icon {
            margin-top: -4px;
          }
          display: block;
        }
      }
    }
  }
}

.md-tabs {
  flex: 1;

  .md-tabs-content {
    height: 100% !important;
  }

  .md-tab {
    padding: 16px;
    overflow: auto;
    bottom: 0;

    .md-card {
      transition: all 0.8s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: translate3d(-30px, 0, 0);
    }
    .list-leave-active {
      position: absolute;
      left: 16px;
      right: 16px;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
