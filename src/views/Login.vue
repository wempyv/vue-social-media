<template>
  <div class="container">
    <div
      class="section-sign-in d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <h1>Sign in</h1>
      <form @submit.prevent>
        <div class="form-group mt-4">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model.trim="loginForm.email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            class="form-control"
            v-model.trim="loginForm.password"
          />
        </div>
        <div class="section-sign-up">
          <p class="p-0 mb-0 text-small">
            You don't have an account ? <router-link to="/sign-up">Sign up</router-link>
          </p>
        </div>
        <div class="section-forget-password">
          <a href="" class="text-small">Forget Password</a>
        </div>
        <div class="form-group mt-4">
          <button class="btn btn-primary form-control" @click="login()">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    }
  }
}
</script>

<style>
</style>
