<template>
  <div class="main-wrapper" :class="[mainWrapperClass, themeClass]">
    <!---Navigation-->
    <Navbar
      :topbarColor="topbarColor"
      :logo="header_logo_image"
      :title="logotitle"
      :logged_user="logged_user"
    />
    <!---Sidebar-->
    <!-- <SideBar parent=".main-wrapper" :sidebarLinks="sidebarLinks"/> -->
    <!---Page Container-->
    <div
      class="main-container-fluid"
      v-bind:style="{
        'background-image': convertBackgroundCssImageUrl(page_background_image),
      }"
    >
      <!-- <Breadcrumb/>	 -->
      <transition
        name="router-anim"
        enter-active-class="fade-enter-active fade-enter"
        leave-active-class="fade-leave-active fade-enter"
      >
        <router-view></router-view>
      </transition>
      <!---Customizer / Settings-->
      <!-- <Customizer @updateTopbarColor="updateTopbarColor" /> -->
    </div>
    <div v-if="main_page">
      <MainFooter></MainFooter>
    </div>
    <div v-else>
      <Footer :footer_logo="footer_logo"></Footer>
    </div>
  </div>
</template>

<script>
import Navbar from "@/layout/full/header/Navbar.vue";
// import SideBar from '@/layout/full/sidebar/SideBar.vue';
// import Customizer from '@/layout/full/customizer/Customizer.vue';
import sidebarLinks from "@/layout/full/sidebar/sidebarlinks.js";
// import Breadcrumb from '@/layout/full/breadcrumb/Breadcrumb.vue';
import themeConfig from "@/../themeConfig.js";
import Footer from "@/layout/full/footer/Footer.vue";
import MainFooter from "@/layout/full/footer/MainFooter.vue";

export default {
  name: "MainContainer",
  components: {
    Navbar,
    Footer,
    MainFooter,
    // SideBar,
    // Customizer,
    // Breadcrumb
  },
  data: () => ({
    topbarColor: themeConfig.topbarColor,
    logotitle: themeConfig.logotitle,
    sidebarLinks: sidebarLinks,
    updateFooter: 0,
    main_page: true,
    page_background_image: "",
    header_logo_image: require("@/assets/images/logo/logo.png"),
    footer_logo: "",
  }),

  methods: {
    updateTopbarColor(val) {
      this.topbarColor = val;
    },

    setFavIcon(current_path) {
      const favicon = document.getElementById("favicon");
      if (current_path == "") {
        favicon.href = process.env.BASE_URL + "icon.png";
      } else if (this.current_product.favicon_image == "") {
        favicon.href = process.env.BASE_URL + "icon.png";
      } else {
        favicon.href = this.current_product.favicon_image;
      }
    },

    convertBackgroundCssImageUrl(url) {
      return "url(" + url + ")";
    },

    setPageBackgroundImage() {
      let current_path = String(window.location.pathname);
      if (current_path == "/library" || current_path == "/settings")
        this.page_background_image = "";
      else
        this.page_background_image = this.current_product.page_background_image;
    },

    setHeaderLogo() {
      let current_path = String(window.location.pathname);
      if (current_path == "/library")
        this.header_logo_image = require("@/assets/images/logo/logo.png");
      else if (this.current_product.header_logo_image)
        this.header_logo_image = this.current_product.header_logo_image;
      else this.header_logo_image = require("@/assets/images/logo/logo.png");
    },
  },

  updated() {
    let current_path = String(window.location.pathname);
    if (current_path == "/library") {
      this.main_page = true;
    } else {
      this.main_page = false;
    }
    this.setFavIcon(current_path);
    this.setPageBackgroundImage();
    this.setHeaderLogo();
    if (this.academy_token !== null) {
      return;
    }
    if (this.logged_user === null) {
      this.$router.push("/login");
    }
  },
  beforeUpdate() {
    if (this.academy_token !== null) return;
    if (this.logged_user == null) {
      this.$router.replace("/login");
    }
  },

  watch: {},

  created() {
    // const params = new URLSearchParams(window.location.search);
    // let token = params.get("academy_token");
    // let product_id = params.get("id");
  },

  computed: {
    academy_token: {
      get() {
        return JSON.parse(localStorage.getItem("academy_token"));
      },
    },
    sidebarWidth: function () {
      return this.$store.state.sidebarWidth;
    },
    mainWrapperClass: function () {
      if (this.sidebarWidth == "default") {
        return "main-wrapper-default";
      } else if (this.sidebarWidth == "mini") {
        return "main-wrapper-mini";
      } else if (this.sidebarWidth) {
        return "main-wrapper-full";
      }
      return "default";
    },
    themeClass: function () {
      if (this.$store.state.theme == "light") {
        return "light-theme";
      } else if (this.$store.state.theme == "dark") {
        return "dark-theme";
      }
      return "default";
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

    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"];
      },
    },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },
  },
};
</script>
<style lang="scss">
.main-container-fluid {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-blend-mode: multiply;
  background-attachment: fixed;
  min-height: 100vh;
  padding-bottom: 120px;
}
.main-wrapper {
  position: relative;
}
</style>