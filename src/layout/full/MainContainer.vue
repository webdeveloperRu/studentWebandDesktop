<template>
  <div class="main-wrapper" :class="[mainWrapperClass, themeClass]">
    <!---Navigation-->
    <Navbar
      :topbarColor="topbarColor"
      :logo="require('@/assets/images/logo/logo.png')"
      :title="logotitle"
      :logged_user="logged_user"
    />
    <!---Sidebar-->
    <!-- <SideBar parent=".main-wrapper" :sidebarLinks="sidebarLinks"/> -->
    <!---Page Container-->
    <div class="main-container-fluid" style="">
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
      <Footer></Footer>
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
  }),

  methods: {
    updateTopbarColor(val) {
      this.topbarColor = val;
    },
  },

  updated() {
    let current_path = String(window.location.pathname);
    if (current_path == "/library") {
      this.main_page = true;
    } else {
      this.main_page = false;
    }
    if (this.academy_token !== null) return;
    if (this.logged_user == null) {
      this.$router.replace("/login");
    }
  },
  beforeUpdate() {
    if (this.academy_token !== null) return;
    if (this.logged_user == null) {
      this.$router.replace("/login");
    }
  },

  watch: {},

  created() {},

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
  },
};
</script>