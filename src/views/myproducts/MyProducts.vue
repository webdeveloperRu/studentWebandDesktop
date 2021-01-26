<template>
  <div>
    <div class="main-banner">
      <p class="banner-title">Library</p>
      <!-- <p class="banner-subtitle">Library subtitle</p> -->
    </div>
    <br />
    <br />
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="9"
        vs-sm="12"
        vs-xs="12"
        code-toggler
      >
        <h2>My Products</h2>
        <vs-divider></vs-divider>
        <vs-card
          actionable
          class="product-card"
          v-for="product in product_list"
          :key="product.id"
        >
          <div
            slot="media"
            class="product-image"
            @click="viewProduct(product.id)"
            v-bind:style="{
              'background-image': 'url(' + product.thumbnail + ')',
            }"
          ></div>
          <div class="product-title">{{ product.title }}</div>
          <vs-button
            color="primary"
            type="border"
            class="view-product"
            @click.native="viewProduct(product.id)"
            >View Product</vs-button
          >
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Product from "../../models/product";
export default {
  name: "MyProducts",
  data: () => ({
    productTitle: "",
    product: new Product("", ""),
  }),

  computed: {
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"];
      },
    },

    notification_text: {
      get() {
        return this.$store.getters["notification_text"];
      },
    },

    notification_icon: {
      get() {
        return this.$store.getters["notification_icon"];
      },
    },

    notification_color: {
      get() {
        return this.$store.getters["notification_color"];
      },
    },

    status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },
    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },
    is_fake: {
      get() {
        return this.$store.getters["is_fake"];
      },
    },
    academy_token: {
      get() {
        return JSON.parse(localStorage.getItem("academy_token"));
      },
    },
  },

  watch: {
    is_fake: function () {
      this.getProductList();
    },
  },

  /**
   * --------------created part-------------
   */
  created() {
    if (this.academy_token != null) {
      this.getProductList();
    } else {
      if (this.user_logged) this.getProductList();
      else this.$router.push("/login").catch(() => {});
    }
    this.$store.dispatch("setFakeMenu", true);
  },
  /**
   * --------------method part-------------
   */
  methods: {
    /**
     * --------------get ProductList-------------
     */
    async getProductList() {
      this.$vs.loading({ type: "material" });
      if (this.academy_token !== null) {
        await this.$store
          .dispatch("productManage/getProductListPreview")
          .then(() => {});
      } else if (this.is_fake) {
        await this.$store
          .dispatch("productManage/getProductListDemo")
          .then(() => {
            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon,
            // });
          });
      } else {
        await this.$store.dispatch("productManage/getProductList").then(() => {
          // this.$vs.notify({
          //   color: this.notification_color,
          //   text: this.notification_text,
          //   icon: this.notification_icon,
          // });
        });
      }
      this.$vs.loading.close(this.$refs.loading);
    },

    /**
     * --------------get ProductList-------------
     */

    viewProduct(product_id) {
      for (let i = 0; i < this.product_list.length; i++) {
        if (this.product_list[i].id == product_id) {
          this.$store.dispatch(
            "productManage/setCurrentProduct",
            this.product_list[i]
          );
        }
      }
      this.$router.push("/product/" + product_id);
    },
  },
};
</script>
<style>
.main-banner {
  margin: 0 -20px;
  margin-top: -24px;
  background-position: center;
  background-image: url("../../assets/images/hero-default-banner.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner-title {
  color: white;
  font-size: 60px;
  font-weight: 600;
}

.product-image {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  width: 30%;
  background-position: center;
  /* background-image: url("../../assets/images/big/img3.jpg"); */
  background-repeat: no-repeat;
  background-size: cover;
  height: 170px;
  /* min-width: 100px; */
}

@media only screen and (min-width: 500px) {
  .product-card .vs-card--content {
    height: 0;
    padding: 0;
  }
  .product-card .product-title {
    position: absolute;
    left: 32%;
    top: 40%;
    font-size: 20px;
    font-weight: 700;
  }
  .product-card {
    position: relative;
  }

  .view-product {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}

@media only screen and (max-width: 500px) {
  .product-image {
    width: 100%;
    background-position: center;
    /* background-image: url("../../assets/images/big/img3.jpg"); */
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
  }
  .product-card .vs-card--content {
    height: auto;
    padding: 20px;
  }
  .product-card .product-title {
    position: relative;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .view-product {
    position: relative;
  }
}
</style>
