<template>
  <div id="learn">
    <h1>Learn</h1>
    <md-card v-for="card in this.$root.knowledge" >
      <md-card-header>
        <md-card-header-text class="md-title">{{ card.name }}</md-card-header-text>
      </md-card-header>
      <md-card-content>{{ card.description }}</md-card-content>
    </md-card>
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
.md-theme-default.md-card {
  background-color: white;
  margin-bottom: 20px;
}
</style>
