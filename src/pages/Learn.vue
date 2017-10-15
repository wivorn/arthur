<template>
  <div id="learn" class="container">
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Today">
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
</style>
