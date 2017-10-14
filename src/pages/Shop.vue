<template>
  <div id="shop">
    <h1>Shop</h1>
    <md-card v-for="card in this.$root.products" >
      <md-card-header>
        <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
      </md-card-header>
      <md-card-content>{{ card.description }}</md-card-content>
    </md-card>
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
