<template>
  <div id="service">
    <header>
      <h1>Service</h1>
    </header>
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="newest" md-label="Newest">
        <md-card v-for="card in this.$root.services" >
          <md-card-header>
            <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
          </md-card-header>
          <md-card-content>{{ card.description }}</md-card-content>
        </md-card>
      </md-tab>
      <md-tab id="popular" md-label="Popular">
        <md-card v-for="card in this.$root.services" >
          <md-card-header>
            <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
          </md-card-header>
          <md-card-content>{{ card.description }}</md-card-content>
        </md-card>
      </md-tab>
      <md-tab id="suggestion" md-label="Suggestion">
        <md-card v-for="card in this.$root.services" >
          <md-card-header>
            <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
          </md-card-header>
          <md-card-content>{{ card.description }}</md-card-content>
        </md-card>
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
</style>
