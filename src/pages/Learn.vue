<template>
  <div id="learn">
    <header>
      <h1>Learn</h1>
    </header>
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Newest">
        <transition-group name="list">
          <md-card v-for="card in this.$root.knowledge" :key="card">
            <md-card-media>
              <img :src="card.imgUrl" alt="">
            </md-card-media>
            <md-card-header>
              <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
            </md-card-header>
            <md-card-content>{{ card.description }}</md-card-content>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="popular" md-label="Popular">
        <transition-group name="list">
          <md-card v-for="card in this.$root.knowledge" :key="card">
            <md-card-media>
              <img :src="card.imgUrl" alt="">
            </md-card-media>
            <md-card-header>
              <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
            </md-card-header>
            <md-card-content>{{ card.description }}</md-card-content>
            <md-ink-ripple></md-ink-ripple>
          </md-card>
        </transition-group>
      </md-tab>
      <md-tab id="suggestion" md-label="Suggestion">
        <transition-group name="list">
          <md-card v-for="card in this.$root.knowledge" :key="card">
            <md-card-media>
              <img :src="card.imgUrl" alt="">
            </md-card-media>
            <md-card-header>
              <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
            </md-card-header>
            <md-card-content>{{ card.description }}</md-card-content>
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
  data () {
    return {
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

.md-card {
  background-color: white !important;
  border-radius: 4px;
  margin-bottom: 16px;

  .md-card-media {
    width: 200px;
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
