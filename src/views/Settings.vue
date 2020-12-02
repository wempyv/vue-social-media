<template>
  <div class="section-setting overflow-hidden">
    <Navigation></Navigation>
    <div
      class="container d-flex flex-column align-items-center justify-content-center min-vh-100 form-settings"
    >
      <h3 class="text-center">Update<br />Your Profile</h3>
      <form @submit.prevent>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="name"
            :placeholder="userProfile.name"
          />
        </div>
        <div class="form-group">
          <label for="title">Job Title</label>
          <input
            type="text"
            class="form-control"
            v-model.trim="title"
            :placeholder="userProfile.title"
          />
        </div>
        <button @click="updateProfile()" class="btn btn-dark form-control">
          Update Profile
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "../components/Navigation";
export default {
  components: {
    Navigation,
  },
  data() {
    return {
      name: "",
      title: "",
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
        title: this.title !== "" ? this.title : this.userProfile.title,
      });

      this.name = "";
      this.title = "";
    },
  },
};
</script>

<style>
</style>
