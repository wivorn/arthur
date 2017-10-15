<template>
  <div id="shop" class="container">
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Today">
        <md-card v-for="card in this.$root.products" :key="card">
          <md-card-media :style="{ backgroundImage: 'url(' + card.imgUrl + ')'}">
          </md-card-media>
          <div class="column">
            <md-card-header>
              <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
            </md-card-header>
          </div>
        </md-card>
      </md-tab>
      <md-tab id="popular" md-label="Popular">
        <md-card v-for="card in this.$root.products" :key="card">
          <md-card-header>
            <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
          </md-card-header>
        </md-card>
      </md-tab>
      <md-tab id="suggestion" md-label="Suggestion">
        <md-card v-for="card in this.$root.products" :key="card">
          <md-card-header>
            <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
          </md-card-header>
        </md-card>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
</style>
