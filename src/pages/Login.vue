<template>
  <div id="login">
    <div class="login-card">
      <div class="logo">Ari</div>
      <p>Live Your Life</p>
      <transition name="fade" mode="out-in">
        <div v-if="loginActive" key="login">
          <md-button class="md-raised button--login button--facebook">Facebook Login</md-button>
          <div>OR</div>
          <md-input-container>
            <label>E-mail</label>
            <md-input type="email"></md-input>
          </md-input-container>
          <md-input-container md-has-password>
            <label>Password</label>
            <md-input type="password"></md-input>
          </md-input-container>
          <md-button type="submit" class="md-raised md-primary button--login" @click="login">Log in</md-button>
          <div>
            Don’t have an account? <button class="button--signup" @click.stop.prevent="loginActive = false">Sign up</button>
          </div>
        </div>
        <div v-else key="signup">
          <md-input-container>
            <label>Name</label>
            <md-input type="text"></md-input>
          </md-input-container>
          <md-input-container>
            <label>E-mail</label>
            <md-input type="email"></md-input>
          </md-input-container>
          <md-input-container md-has-password>
            <label>Password</label>
            <md-input type="password"></md-input>
          </md-input-container>
          <md-button class="md-raised md-primary button--login" @click="signup">Sign Up</md-button>
          <div>
            Already have an account? <button class="button--signup" @click.stop.prevent="loginActive = true">Log in</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'Login',
  data () {
    return {
      loginActive: true
    }
  },
  methods: {
    login () {
      console.log('login')
      router.push('you')
    },
    signup () {
      console.log('signup')
      router.push('you')
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

#login {
  display: flex;
  align-items: center;
  background: url('../assets/ocean.jpg');
  background-size: cover;
  height: 100%;

  .login-card {
    max-width: 600px;
    min-height: 500px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    background: rgba(255,255,255,0.85);
    padding: 40px;
    border-radius: 4px;

    @media screen and (max-width: 648px) {
      max-width: 100%;
      min-height: 100%;
      background: rgba(255,255,255,0.5);
      background-blend-mode: multiply;
    }
  }

  .logo {
    font-family: 'Alex Brush', cursive;
    font-size: 64px;
    display: block;
    border-radius: 50%;
    margin: 48px auto 0;
    color: #F2453E;
  }

  p {
    font-size: 16px;
    margin: 24px 0 36px;
    color: #666666;
  }

  form {
    opacity: 1;
  }

  .md-input-container {
    display: block;
    max-width: 300px;
    width: 100%;
    margin: 0 auto 16px;
  }

  .button--login {
    max-width: 300px;
    width: 100%;
    height: 45px;
    margin: 0 auto 20px;
  }

  .button--facebook {
    background: #4469AF;
    color: white;
  }

  .button--signup {
    color: #FD5457;
    background: none;
    border: 0;
    font-size: 14px;
  }
}
</style>
