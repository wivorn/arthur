<template>
  <main id="main">
    <header>
      <h1>{{ this.title }}</h1>
      <md-button class="md-icon-button md-raised md-accent md-primary" @click="popupSearch = true">
        <md-icon>search</md-icon>
      </md-button>
    </header>
    <router-view></router-view>
    <md-bottom-bar>
      <md-bottom-bar-item md-icon="favorite" :md-active="this.$route.path === '/you'" @click="navigate('you')">You</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="school" :md-active="this.$route.path === '/learn'" @click="navigate('learn')">Learn</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="shopping_cart" :md-active="this.$route.path === '/shop'" @click="navigate('shop')">Shop</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="spa" :md-active="this.$route.path === '/service'" @click="navigate('service')">Services</md-bottom-bar-item>
      <md-bottom-bar-item md-icon="face" :md-active="this.$route.path === '/settings'" @click="navigate('settings')">Profile</md-bottom-bar-item>
    </md-bottom-bar>
    <transition name="fade">
      <div class="popup search-popup" v-show="popupSearch">
        <md-button class="close md-fab md-primary md-mini" @click="popupSearch = false"><md-icon>close</md-icon></md-button>
        <div class="popup-container">
          <md-input-container md-inline>
            <label>Search</label>
            <md-input></md-input>
          </md-input-container>
          <div class="tag-list">
            <md-button class="md-raised md-primary" v-for="item in list">{{ item }}</md-button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="popup" v-show="popup">
        <md-button class="close md-fab md-primary md-mini" @click="close"><md-icon>close</md-icon></md-button>
        <md-card>
          <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}"></md-card-media>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ card.name }}</div>
              <div class="md-subhead">{{ card.description }}</div>
            </md-card-header-text>
          </md-card-header>
          <md-list class="custom-list md-triple-line">
            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/1" alt="People">
              </md-avatar>
              <div class="md-list-text-container">
                <span>Ali Connors</span>
                <p>Really good read, highly recommend</p>
              </div>
              <md-button class="md-icon-button md-list-action">
                <md-icon>sms</md-icon>
              </md-button>
              <md-divider class="md-inset"></md-divider>
            </md-list-item>
            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/6" alt="People">
              </md-avatar>
              <div class="md-list-text-container">
                <span>Jennifer</span>
                <p>I find it really helpful for managing my pain</p>
              </div>

              <md-divider class="md-inset"></md-divider>
            </md-list-item>
          </md-list>
          <md-card-actions>
            <md-button>Save</md-button>
            <md-button @click="recommend(0)">Recommend</md-button>
            <md-button class="md-primary">Visit</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </transition>
  </main>
</template>

<script>
import router from '../router'

export default {
  name: 'Main',
  data () {
    return {
      popupSearch: false,
      list: ['Daily Living', 'Patient Support Program', 'Physiotherapist', 'Workplace', 'Exercises', 'Diets']
    }
  },
  computed: {
    popup () {
      return this.$store.state.popup
    },
    card () {
      return this.$store.state.current
    },
    recommend (index) {
      this.$store.dispatch('hidePopup')
      this.$store.dispatch('recommendItem', index)
    },
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
    },
    close () {
      this.$store.dispatch('hidePopup')
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

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.95);
    z-index: 10;
    padding: 24px;

    .md-list-text-container > * {
      overflow: initial;
      white-space: normal;
      line-height: 1.2;
    }

    .md-list-text-container span {
      margin-bottom: 4px;
    }

    .close {
      position: absolute;
      z-index: 11;
      top: 32px;
      right: 32px;
    }

    .md-list {
      background: white;
    }
  }

  .search-popup {
    background: rgba(255,255,255,.97);

    .tag-list {
      display: flex;
      flex-wrap: wrap;

      .md-button {
        flex: 1 0 auto;
        margin: 8px;
      }
    }

    .close {
      position: absolute;
      z-index: 11;
      top: 16px;
      right: 16px;
    }

    .md-input-container {
      label {
        font-size: 24px;
      }
      input {
        font-size: 24px;
      }
    }
  }
}

header {
  flex: 0 0 69px;
  // border-bottom: 1px solid #DDDDDD;
  padding: 24px 16px;
  background: white;

  h1 {
    display: inline-block;
    font-size: 40px;
    margin: 8px auto 0;
  }

  .md-button.md-icon-button {
    display: inline-block;
    float: right;
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
    box-shadow: 0 2px 5px rgba(216, 223, 216, 0.5), 0 2px 2px rgba(216, 223, 216, 0.3), 0 3px 1px -2px rgba(216, 223, 216, 0.2);

    &:hover {
      box-shadow: 0 5px 5px -3px rgba(216, 223, 216, 0.5), 0 8px 10px 1px rgba(216, 223, 216, 0.3), 0 3px 14px 2px rgba(216, 223, 216, 0.2);
    }

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
      transition: all 0.6s;
      will-change: transform;
      perspective: 1000px;
      transform-style: preserve-3d;
      backface-visibility: hidden;
      transform-origin: bottom;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: scale(0.6);
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
