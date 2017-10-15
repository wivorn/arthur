<template>
  <div id="service" class="container">
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Today">
        <transition-group name="list">
          <md-card v-for="card in this.$root.services" :key="card">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
              <md-card-header>
                <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
              </md-card-header>
              <md-card-content>{{ card.description }}</md-card-content>
            </div>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="popular" md-label="Popular">
        <transition-group name="list">
          <md-card v-for="card in this.$root.services" :key="card">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
              <md-card-header>
                <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
              </md-card-header>
              <md-card-content>{{ card.description }}</md-card-content>
            </div>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="suggestion" md-label="Suggestion">
        <transition-group name="list">
          <md-card v-for="card in this.$root.services" :key="card">
            <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
            </md-card-media>
            <div class="column">
              <md-card-header>
                <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
              </md-card-header>
              <md-card-content>{{ card.description }}</md-card-content>
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
  name: 'Service',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
#service {
  .md-theme-default {
    &.md-card {
      .md-card-media {
        flex: 0 0 20%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
