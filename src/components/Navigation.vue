<template>
  <div class="section-dashboard">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <a class="navbar-brand text-white" href="#"><img src="../assets/images/icon.svg" alt=""></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ml-auto">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/settings">Edit Profile</router-link>
            <a class="btn btn-dark" @click="logout()">Logout</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
</style>
