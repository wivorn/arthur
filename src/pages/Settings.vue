<template>
  <div id="settings" class="container">
    <md-tabs md-fixed class="md-transparent">
      <md-tab id="account" md-label="About You">
        <md-card md-with-hover>
          <md-card-header>
            <div class="md-title">Help us get to know you better</div>
            <div class="md-subhead">This will only take a few minutes of your time so we can better help find relevant information for you</div>
          </md-card-header>
          <md-card-actions>
            <md-button class="md-primary">Get Started</md-button>
          </md-card-actions>
        </md-card>
      </md-tab>
      <md-tab id="privacy" md-label="Privacy">
        <md-card md-with-hover>
          <md-card-header>
            <div class="md-title">We care about your privacy</div>
          </md-card-header>
        </md-card>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
</style>
