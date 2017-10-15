<template>
  <div id="shop" class="container">
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Today">
        <transition-group name="list" tag="div" appear>
          <md-card v-for="card in this.$root.products" :key="card.name">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
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
            <md-card-actions>
              <md-button class="md-icon-button">
                <md-icon>turned_in</md-icon>
              </md-button>
              <md-button class="later"><md-icon>turned_in</md-icon> View Later</md-button>
              <md-button class="later"><md-icon>drafts</md-icon> View Now</md-button>
            </md-card-actions>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="popular" md-label="Popular">
        <transition-group name="list" tag="div" appear>
          <md-card v-for="card in popular" :key="card.name">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
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
            <md-card-actions>
              <md-button class="md-icon-button">
                <md-icon>turned_in</md-icon>
              </md-button>
              <md-button class="later"><md-icon>turned_in</md-icon> View Later</md-button>
              <md-button class="later"><md-icon>drafts</md-icon> View Now</md-button>
            </md-card-actions>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="suggestion" md-label="Suggestion">
        <transition-group name="list" tag="div" appear>
          <md-card v-for="card in this.$root.products" :key="card.name">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
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
            <md-card-actions>
              <md-button class="md-icon-button">
                <md-icon>turned_in</md-icon>
              </md-button>
              <md-button class="later"><md-icon>turned_in</md-icon> View Later</md-button>
              <md-button class="later"><md-icon>drafts</md-icon> View Now</md-button>
            </md-card-actions>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  computed: {
    popular () {
      var test = this.$root.products.slice()
      return test.sort(function (a, b) {
        var bLength = b.reviews === undefined ? 1 : b.reviews.length
        var aLength = a.reviews === undefined ? 1 : a.reviews.length
        return bLength - aLength
      })
    }
  },
  methods: {
    randomAvatar () {
      let gender = Math.random() > 0.5 ? 'men' : 'women'
      let rand = Math.floor(Math.random() * 100)
      let link = `https://randomuser.me/api/portraits/med/${gender}/${rand}.jpg`
      console.log(link)
      return link
    }
  }
}
</script>

<style lang="scss">
</style>
