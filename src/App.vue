<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data: () => ({}),
  methods: {
    checkToken: function() {
      this.$store
        .dispatch("auth/getSettings")
        .then(() => {
          if (this.status_got) this.$router.push("/library").catch(() => {});
          if (!this.status_got) this.$router.push("/login");
        })
        .catch(() => {
          this.$router.push("/login");
        });
    },
  },
  created() {
    if (this.logged_user != null) this.checkToken();
    else this.$router.push("/login");
  },
  computed: {
    logged_user: {
      get() {
        return this.$store.getters["auth/logged_user"];
      },
    },
    status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },
  },
};
</script>

<style>
#app * {
  -moz-user-select: none !important;
  -webkit-user-select: none !important;
}

.vuesax-app-is-ltr {
  background-color: #272d34;
  height: 100%;
}
</style>
