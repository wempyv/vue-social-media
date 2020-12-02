<template>
  <div class="container">
    <div
      class="section-sign-in d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <h1>Sign up</h1>
      <form @submit.prevent>
        <div class="form-group mt-4">
          <input
            type="text"
            class="form-control"
            placeholder="Your Name"
            v-model.trim="signupForm.name"
          />
        </div>
        <div class="form-group mt-4">
          <input
            type="text"
            class="form-control"
            placeholder="Your Job"
            v-model.trim="signupForm.title"
          />
        </div>
        <div class="form-group mt-4">
          <input
            type="email"
            class="form-control"
            placeholder="Email"
            v-model.trim="signupForm.email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            class="form-control"
            v-model.trim="signupForm.password"
          />
        </div>
        <div class="section-sign-up">
          <p class="p-0 mb-0 text-small">
            Already have an account ?
            <router-link to="/login">Sign in</router-link>
          </p>
        </div>
        <div class="form-group mt-4">
          <button class="btn btn-primary form-control" @click="signup()">
            Sign up
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
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signup () {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
    }
  }
}
</script>

<style>
</style>
