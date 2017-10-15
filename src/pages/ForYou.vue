<template>
  <div id="you" class="container">
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Today">
        <transition-group name="list" tag="div" appear>
          <md-card v-for="(card, index) in this.cardsToday" :key="card.name" md-with-hover>
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
                <div class="icons">
                  <md-button class="md-icon-button" @click="readLater(index)">
                    <md-icon>turned_in</md-icon>
                  </md-button>
                </div>
              </div>
            </div>
            <md-card-media v-if="card.type !== 'video'" :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}" @click="readNow(index, card)"></md-card-media>
            <div class="column" v-if="card.type !== 'video'" @click="readNow(index, card)">
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">{{ card.name }}</div>
                  <span v-for="review in card.reviews" :key="review">
                    <md-avatar>
                      <img :src="randomAvatar()" alt="Avatar">
                    </md-avatar>
                  </span>
                </md-card-header-text>
              </md-card-header>
            </div>
            <md-card-actions v-if="card.type !== 'video'">
              <md-button class="md-icon-button" @click="readLater(index)">
                <md-icon>turned_in</md-icon>
              </md-button>
              <md-button class="later" @click="readLater(index)"><md-icon>turned_in</md-icon> Read Later</md-button>
              <md-button class="later"><a :href="card.url"><md-icon>drafts</md-icon> Read Now</a></md-button>
            </md-card-actions>
            <md-ink-ripple v-if="card.type !== 'video'"></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="personal" md-label="Saved">
        <transition-group name="list">
          <md-card v-for="(card, index) in this.cardsSaved" :key="card.name" md-with-hover>
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
                <md-button class="md-icon-button" @click="readLater(index)">
                  <md-icon>drafts</md-icon>
                </md-button>
              </div>
            </div>
            <md-card-media v-if="card.type !== 'video'" :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}" @click="readNow(index, card)"></md-card-media>
            <div class="column" v-if="card.type !== 'video'" @click="readNow(index, card)">
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">{{ card.name }}</div>
                  <span v-for="review in card.reviews" :key="review">
                    <md-avatar>
                      <img :src="randomAvatar()" alt="Avatar">
                    </md-avatar>
                  </span>
                </md-card-header-text>
              </md-card-header>
            </div>
            <md-card-actions v-if="card.type !== 'video'">
              <md-button class="later"><md-icon>drafts</md-icon> Read Now</md-button>
            </md-card-actions>
            <md-ink-ripple v-if="card.type !== 'video'"></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="recommend" md-label="Recommend">
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'ForYou',
  methods: {
    randomAvatar () {
      let gender = Math.random() > 0.5 ? 'men' : 'women'
      let rand = Math.floor(Math.random() * 100)
      let link = `https://randomuser.me/api/portraits/med/${gender}/${rand}.jpg`
      return link
    },
    getYoutubeId (url) {
      return this.$youtube.getIdFromURL(url)
    },
    readLater (index) {
      this.$store.dispatch('saveItem', index)
    },
    readNow (index, data) {
      this.$store.dispatch('showPopup', data)
    }
  },
  computed: {
    cardsToday () {
      return this.$store.state.today
    },
    cardsSaved () {
      return this.$store.state.saved
    }
  }
}
</script>

<style lang="scss">
.md-button {
  a {
    text-decoration: none !important;
    color: #2c3e50 !important;
  }
}
</style>
