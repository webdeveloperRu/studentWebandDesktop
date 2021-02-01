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
    checkToken: function () {
      this.$store
        .dispatch("auth/getSettings")
        .then(() => {
          if (this.status_got) {
            if (
              this.$router.currentRoute.fullPath == "/" ||
              this.$router.currentRoute.fullPath == "/Error404"
            ) {
              this.$router.replace("/library").catch(() => {});
            } else {
              this.$router.replace(this.$router.currentRoute).catch(() => {});
            }
          }
          if (!this.status_got) this.$router.replace("/login");
        })
        .catch(() => {
          this.$router.replace("/login");
        });
    },

    async getProductList(product_id) {
      try {
        this.$vs.loading({ type: "material" });
        if (this.academy_token !== null) {
          await this.$store
            .dispatch("productManage/getProductListPreview")
            .then(() => {
              for (let i = 0; i < this.product_list.length; i++) {
                if (this.product_list[i].id == product_id) {
                  this.$store.dispatch(
                    "productManage/setCurrentProduct",
                    this.product_list[i]
                  );
                }
              }
            });
        }
        this.$vs.loading.close(this.$refs.loading);
      } catch (err) {}
    },
  },

  created() {
    const params = new URLSearchParams(window.location.search);
    let token = params.get("academy_token");
    let product_id = params.get("id");
    if (token !== null) {
      this.$store.commit("ACADEMY_TOKEN", token);
      this.getProductList(product_id).then(() => {
        this.$router.replace("/product/" + product_id).catch(() => {});
      });
    } else {
      if (JSON.parse(localStorage.getItem("academy_token")) !== null) {
        if (window.location.pathname == "/")
          this.$router.push("/library").catch(() => {});
        else this.$router.push(window.location.pathname).catch(() => {});
      } else {
        if (this.logged_user != null) this.checkToken();
        else this.$router.replace("/login");
      }
    }
  },
  computed: {
    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },
    academy_token: {
      get() {
        return JSON.parse(localStorage.getItem("academy_token"));
      },
    },
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

<style lang ="scss">
@import "./assets/scss/_font.scss";
#app * {
  -moz-user-select: none !important;
  -webkit-user-select: none !important;
}
</style>
