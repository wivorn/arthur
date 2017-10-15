<template>
  <div id="learn">
    <header>
      <h1>Learn</h1>
    </header>
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Newest">
        <transition-group name="list">
          <md-card v-for="card in this.$root.knowledge" :key="card" md-with-hover>
            <div class="video-card" v-if="card.type === 'video'">
              <youtube class="video" :video-id="getYoutubeId(card.url)" player-width="640px"></youtube>
              <div class="avatar-list">
                <md-avatar>
                  <img src="https://randomuser.me/api/portraits/med/men/1.jpg" alt="Avatar">
                </md-avatar>
                <md-avatar>
                  <img src="https://randomuser.me/api/portraits/med/women/12.jpg" alt="Avatar">
                </md-avatar>
                <md-avatar>
                  <img src="https://randomuser.me/api/portraits/med/men/18.jpg" alt="Avatar">
                </md-avatar>
                <md-avatar>
                  <img src="https://randomuser.me/api/portraits/med/women/23.jpg" alt="Avatar">
                </md-avatar>
                <span>+18 Others</span>
                <md-button class="md-icon-button">
                  <md-icon>grade</md-icon>
                </md-button>
              </div>
            </div>
            <md-card-media v-if="card.type !== 'video'" :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}"></md-card-media>
            <div class="column" v-if="card.type !== 'video'">
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">{{ card.name }}</div>
                  <div v-for="review in card.reviews" :key="review">
                    <md-avatar>
                      <img :src="randomAvatar()" alt="Avatar">
                    </md-avatar>
                  </div>
                </md-card-header-text>
              </md-card-header>
            </div>
            <md-card-actions v-if="card.type !== 'video'">
              <md-button class="md-icon-button">
                <md-icon>grade</md-icon>
              </md-button>
              <md-button class="later"><md-icon>grade</md-icon> Read Later</md-button>
            </md-card-actions>
            <md-ink-ripple v-if="card.type !== 'video'"></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="popular" md-label="Popular">
        <transition-group name="list">
          <md-card v-for="card in this.$root.knowledge" :key="card">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
              <md-card-header>
                <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
              </md-card-header>
            </div>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="suggestion" md-label="Suggestion">
        <transition-group name="list">
          <md-card v-for="card in this.$root.knowledge" :key="card">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
              <md-card-header>
                <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
              </md-card-header>
            </div>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'Learn',
  methods: {
    randomAvatar () {
      let gender = Math.random() > 0.5 ? 'men' : 'women'
      let rand = Math.floor(Math.random() * 100)
      let link = `https://randomuser.me/api/portraits/med/${gender}/${rand}.jpg`
      console.log(link)
      return link
    },
    getYoutubeId (url) {
      return this.$youtube.getIdFromURL(url)
    }
  }
}
</script>

<style lang="scss">
header {
  border-bottom: 1px solid #DDDDDD;
  margin-bottom: 16px;
  padding: 12px 0 24px;

  h1 {
    font-size: 40px;
    margin: 0;
  }
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
        flex: 0 0 150px;
        background-size: 100% auto;
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
  .md-tab {
    padding: 16px 2px;
  }
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
