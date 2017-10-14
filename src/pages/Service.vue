<template>
  <div id="service">
    <h1>Service</h1>
    <md-card v-for="card in this.$root.services" >
      <md-card-header>
        <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
      </md-card-header>
      <md-card-content>{{ card.description }}</md-card-content>
    </md-card>
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
