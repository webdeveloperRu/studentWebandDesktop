<template>
  <header class="gridx">
    <vs-navbar
      v-if="current_product.customize_header !== undefined"
      class="product-announcement topnavbar"
      style="min-height: 50px"
      v-bind:style="{
        background: announcement_color,
        color: announcement_text_color,
      }"
    >
      <div
        class="product-announcement-text"
        @click="linkToAnnouncementUrl"
        v-if="current_product.customize_header.announcement_new_window"
        v-bind:style="{
          'font-family': current_product.customize_settings.base_font_family,
        }"
      >
        {{ current_product.customize_header.announcement_text }}
      </div>
      <a
        v-if="!current_product.customize_header.announcement_new_window"
        class="product-announcement-text"
        :href="current_product.customize_header.announcement_url"
        v-bind:style="{
          color: current_product.customize_header.announcement_text_color,
        }"
      >
        {{ current_product.customize_header.announcement_text }}
      </a>
    </vs-navbar>
    <vs-navbar
      v-model="indexActive"
      :color="topbarColor"
      class="topnavbar"
      text-color="rgba(255,255,255,0.7)"
      active-text-color="rgba(255,255,255,1)"
      v-bind:style="{
        'margin-top': navbar_header_height,
      }"
    >
      <!---
      Template logo
      -->
      <div slot="title">
        <a href="/">
          <img
            :src="logo"
            v-if="logo"
            alt="Dashboard"
            :height="header_logo_height"
            class="header-logo ml-3"
        /></a>
        <!-- <a href="/"> <img src="@/assets/images/logo.s" v-if="logo" alt="Dashboard" width="50" /></a> -->
        <!-- <span
          class="logo-text"
          v-if="title"
          style="display: block; width: 300px"
          >{{ title }}</span
        > -->
      </div>
      <!---
      Mobile toggle
      -->
      <!-- <div slot="title">
        <div class="hiddenDesktop cursor-pointer" @click.stop="activeSidebar">
          <vs-icon icon="menu"></vs-icon>
        </div>
      </div> -->
      <!---
      Desktop Toggle
      -->
      <!-- <div class="hiddenMobile cursor-pointer" @click="reduceSidebar" v-show="!showToggle">
        <vs-icon icon="menu"></vs-icon>
      </div>
      <div class="hiddenMobile cursor-pointer" @click="fullSidebar" v-show="showToggle">
        <vs-icon icon="menu"></vs-icon>
      </div> -->
      <!---
      Craete new dd
      -->
      <!-- <vs-dropdown vs-trigger-click class="cursor-pointer ml-md-4">
        <a class="small-icon text-white-dark" href="#">
          {{getCurrentLanguage.lang}}
          <vs-icon icon="expand_more"></vs-icon>
        </a>
        <vs-dropdown-menu class="topbar-dd">
          <vs-dropdown-item @click="changeLanguage('en')">English</vs-dropdown-item>
          <vs-dropdown-item @click="changeLanguage('fr')">French</vs-dropdown-item>
          <vs-dropdown-item @click="changeLanguage('ch')">Chinese</vs-dropdown-item>
          <vs-dropdown-item @click="changeLanguage('gr')">German</vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown> -->

      <vs-spacer></vs-spacer>
      <!---
      Search new dd
      -->
      <!-- <div class="cursor-pointer pr-2 pl-2 ml-1 mr-1">Store</div> -->
      <div v-if="academy_token !== null">
        <vs-button size="13" type="border" @click.native="exitPreview"
          >Exit Preview</vs-button
        >
      </div>
      <div
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
        @click="linkToMyproducts"
        v-bind:style="{
          'font-family': heading_font_family,
        }"
      >
        My Library
      </div>
      <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
      >
        <a
          class="text-white-dark"
          href="#"
          href.prevent
          v-bind:style="{
            'font-family':
              heading_font_family,
          }"
        >
          Search
          <!-- <vs-icon icon="search"></vs-icon> -->
        </a>
        <vs-dropdown-menu class="topbar-dd">
          <div class="p-2 m-1">
            <vs-input
              placeholder="Search & hit enter"
              v-model="keyword"
              v-on:keyup.enter="searchLessons"
            />
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>

      <!---
      New mail Dropdown
      -->
      <!-- <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
      >
        <a class="text-white-dark" href="#">
          <vs-icon icon="notifications"></vs-icon>
        </a>
        <vs-dropdown-menu class="topbar-dd common-dd mailbox">
          <div class="drop-title bg-info p-3 text-white">
            <h4 class="mb-0 mt-1">{{ mails.length }} New</h4>
            <span class="font-light">Mails</span>
          </div>
          <div v-bar class="vs-scrollable" style="height: 200px">
            <div>
              <vs-dropdown-item
                class="message-center overflow-auto position-relative"
                v-for="mail in mails"
                :mail="mail"
                :key="mail.mailtitle"
              > -->
      <!-- Message -->
      <!-- <a href="javascript:void(0)" class="d-flex align-items-center">
                  <vs-button
                    radius
                    color
                    :class="[mail.btnbg]"
                    type="filled"
                    :icon="mail.btnicon"
                  ></vs-button>
                  <div
                    class="mail-contnet d-inline-block w-75 pl-2 align-middle"
                  >
                    <h6 class="message-title mt-1">{{ mail.mailtitle }}</h6>
                    <span
                      class="mail-desc d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ mail.maildesc }}</span
                    >
                    <span
                      class="time d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ mail.mailtime }}</span
                    >
                  </div>
                </a>
              </vs-dropdown-item>
            </div>
          </div>
          <div>
            <a
              class="d-block text-center text-dark p-3"
              href="javascript:void(0);"
            >
              <strong>Check all Mails</strong>
              <vs-icon icon="keyboard_arrow_right" class="ml-1"></vs-icon>
            </a>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown> -->
      <!---
      New Messages Dropdown
      -->
      <!-- <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-1"
      >
        <a class="text-white-dark" href="#">
          <vs-icon icon="mode_comment"></vs-icon>
          <span
            class="dot-count vs-avatar--count badgeNumber dot-count-danger"
            >{{ chats.length }}</span
          >
        </a>
        <vs-dropdown-menu class="topbar-dd common-dd mailbox">
          <div class="drop-title bg-danger p-3 text-white">
            <h4 class="mb-0 mt-1">{{ chats.length }} New</h4>
            <span class="font-light">Messages</span>
          </div>
          <div v-bar class="vs-scrollable" style="height: 200px">
            <div>
              <vs-dropdown-item
                class="message-center overflow-auto position-relative"
                v-for="chat in chats"
                :chat="chat"
                :key="chat.chattitle"
              > -->
      <!-- Message -->
      <!-- <a href="javascript:void(0)" class="d-flex align-items-center">
                  <span class="user-img position-relative d-inline-block">
                    <img
                      :src="require('@/assets/images/users' + chat.img)"
                      alt="user"
                      class="rounded-circle"
                    />
                    <span
                      class="profile-status pull-right d-inline-block position-absolute"
                      :class="[chat.userstatus]"
                    ></span>
                  </span>
                  <div
                    class="mail-contnet d-inline-block w-75 pl-2 align-middle"
                  >
                    <h6 class="message-title mt-1">{{ chat.msgtitle }}</h6>
                    <span
                      class="mail-desc d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ chat.msgdesc }}</span
                    >
                    <span
                      class="time d-block text-truncate overflow-hidden text-nowrap text-muted"
                      >{{ chat.msgtime }}</span
                    >
                  </div>
                </a>
              </vs-dropdown-item>
            </div>
          </div>
          <div>
            <a
              class="d-block text-center text-dark p-3"
              href="javascript:void(0);"
            >
              <strong>Check all messages</strong>
              <vs-icon icon="keyboard_arrow_right" class="ml-1"></vs-icon>
            </a>
          </div>
        </vs-dropdown-menu>
      </vs-dropdown> -->
      <!---
      Craete new dd
      -->
      <vs-dropdown
        vs-trigger-click
        left
        class="cursor-pointer pr-2 pl-2 ml-1 mr-md-3"
        v-if="logged_user !== null"
      >
        <a class="text-white-dark" href="#">
          <!-- <img
            v-if="logged_user.data.avatar != null || logged_user.data.avatar != '' "
            :src="logged_user.data.avatar"
            alt="user"
            class="rounded-circle"
            width="60"
          /> -->
          <vs-avatar
            size="50px"
            v-if="
              logged_user.data.avatar != null || logged_user.data.avatar != ''
            "
            :src="logged_user.data.avatar"
          ></vs-avatar>
        </a>
        <vs-dropdown-menu class="user-dd common-dd topbar-dd">
          <div v-for="user in users" :user="user" :key="user.usertitle">
            <div
              class="d-flex align-items-center p-3 text-white mb-2"
              style="background-color: #272d34"
            >
              <div class>
                <!-- <img
                  v-if="logged_user.data.avatar != null || logged_user.data.avatar != '' "
                  :src="logged_user.data.avatar"
                  alt="user"
                  class="rounded-circle"
                  width="60"
                /> -->
                <vs-avatar
                  size="60px"
                  v-if="
                    logged_user.data.avatar != null ||
                    logged_user.data.avatar != ''
                  "
                  :src="logged_user.data.avatar"
                ></vs-avatar>
              </div>
              <div class="ml-2">
                <h4
                  v-if="
                    logged_user.data.name != null || logged_user.data.name != ''
                  "
                  class="mb-0 text-white"
                >
                  {{ logged_user.data.name }}
                </h4>
                <p
                  v-if="
                    logged_user.data.email != null ||
                    logged_user.data.email != ''
                  "
                  class="mb-0"
                >
                  {{ logged_user.data.email }}
                </p>
              </div>
            </div>

            <!-- <vs-dropdown-item>
              <vs-icon icon="person_outline" class="mr-1"></vs-icon>
              {{ user.dditem1 }}
            </vs-dropdown-item>
            <vs-dropdown-item>
              <vs-icon icon="sentiment_very_satisfied" class="mr-1"></vs-icon>
              {{ user.dditem2 }}
            </vs-dropdown-item>
            <vs-dropdown-item>
              <vs-icon icon="mail_outline" class="mr-1"></vs-icon>
              {{ user.dditem3 }}
            </vs-dropdown-item> -->

            <!-- <hr class="mb-1" /> -->
            <vs-dropdown-item
              @click="activeTwoFactorSetup = true"
              style="padding: 5px, 0px"
            >
              <div>
                <i class="mr-2 mdi mdi-key-plus"></i>
                {{ user.twoFactorAuthSetup }}
              </div>
            </vs-dropdown-item>
            <vs-dropdown-item @click="LinkToSettings">
              <vs-icon icon="gps_not_fixed" class="mr-1"></vs-icon>
              {{ user.dditem4 }}
            </vs-dropdown-item>
            <vs-dropdown-item @click="setFakeData" v-if="show_fake_menu">
              <vs-checkbox class="justify-content-start" v-model="fake_data">{{
                user.dditem5
              }}</vs-checkbox>
            </vs-dropdown-item>
            <hr class="mt-1" />
            <vs-button
              color="#272d34"
              type="filled"
              size="small"
              class="rounded-button ml-3 mb-3"
              v-on:click="logOut"
              >Logout</vs-button
            >
          </div>
        </vs-dropdown-menu>
      </vs-dropdown>
      <vs-avatar v-if="logged_user == null" size="50px"></vs-avatar>
    </vs-navbar>
    <!--//////////////////////////
      Two Factor Authentication
     /////////////////////////// -->
    <vs-popup
      color="success"
      :active.sync="activeTwoFactorSetup"
      title="Two Factor Set Up"
      class="two-factor-auth-setup"
      fullscreen
    >
      <div v-if="logged_user != null">
        <TwoFactorAuthSetup
          :getQrCode="activeTwoFactorSetup"
        ></TwoFactorAuthSetup>
      </div>
    </vs-popup>
  </header>
</template>

<script>
import TwoFactorAuthSetup from "../../../views/authentication/TwoFactorAuthSetup";
export default {
  name: "Navbar",
  components: {
    TwoFactorAuthSetup,
  },
  props: {
    topbarColor: {
      type: String,
      default: "#2962ff",
    },
    title: {
      type: String,
    },
    logo: {
      type: String,
    },
    logged_user: Object,
    // Obj for Userdropdown
    user: Object,
    // Obj for Mail Dropdown
    mail: Object,
    // Obj for Chat Dropdown
    chat: Object,
  },
  data: () => ({
    indexActive: 0,
    showToggle: false,
    keyword: "",
    fake_data: true,
    // Data For User Dropdown
    users: [
      {
        img: "",
        name: "",
        email: "",
        dditem1: "My Profile",
        dditem2: "My Balance",
        dditem3: "Inbox",
        dditem4: "Account Setting",
        dditem5: "Fake Data",
        twoFactorAuthSetup: "Two Factor Authentication SetUp",
      },
    ],
    // Data For Mailbox
    // mails: [
    //   {
    //     btnbg: "vs-button-primary",
    //     btnicon: "question_answer",
    //     mailtitle: "Luanch Admin",
    //     maildesc: "Just see the my new admin!",
    //     mailtime: "9:30 AM",
    //   },
    //   {
    //     btnbg: "vs-button-success",
    //     btnicon: "calendar_view_day",
    //     mailtitle: "Event today",
    //     maildesc: "Just a reminder that you have event",
    //     mailtime: "9:10 AM",
    //   },
    //   {
    //     btnbg: "vs-button-warning",
    //     btnicon: "perm_data_setting",
    //     mailtitle: "Settings",
    //     maildesc: "You can customize this template as you want",
    //     mailtime: "9:08 AM",
    //   },
    //   {
    //     btnbg: "vs-button-danger",
    //     btnicon: "face",
    //     mailtitle: "Pavan kumar",
    //     maildesc: "Just see the my admin!",
    //     mailtime: "9:02 AM",
    //   },
    // ],
    // Data For Chats
    // chats: [
    //   {
    //     img: "/3.jpg",
    //     userstatus: "online",
    //     msgtitle: "Pavan kumar",
    //     msgdesc: "Just see the my admin!",
    //     msgtime: "9:30 AM",
    //   },
    //   {
    //     img: "/1.jpg",
    //     userstatus: "busy",
    //     msgtitle: "Sonu Nigam",
    //     msgdesc: "I have sung a song! See you at",
    //     msgtime: "9:10 AM",
    //   },
    //   {
    //     img: "/2.jpg",
    //     userstatus: "away",
    //     msgtitle: "Arijit Sinh",
    //     msgdesc: "I am a singer!",
    //     msgtime: "9:08 AM",
    //   },
    //   {
    //     img: "/3.jpg",
    //     userstatus: "away",
    //     msgtitle: "Arijit Sinh",
    //     msgdesc: "I am a singer!",
    //     msgtime: "9:08 AM",
    //   },
    //   {
    //     img: "/4.jpg",
    //     userstatus: "offline",
    //     msgtitle: "Pavan kumar",
    //     msgdesc: "Just see the my admin!",
    //     msgtime: "9:30 AM",
    //   },
    // ],
    activeTwoFactorSetup: false,
  }),

  created() {
    this.fake_data = this.is_fake;
  },

  methods: {
    exitPreview() {
      localStorage.removeItem("academy_token");
      this.$router.push("/login");
    },
    linkToAnnouncementUrl() {
      window.open(
        this.current_product.customize_header.announcement_url,
        "_blank"
      );
    },
    //This is for sidebar trigger in mobile
    activeSidebar() {
      this.$store.commit("TOGGLE_SIDEBAR_ACTIVE", true);
    },
    //This is for sidebar trigger in Desktop
    reduceSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", true);
      this.$store.dispatch("updateSidebarWidth", "mini");
      // this.showToggle = true;
    },
    fullSidebar() {
      this.$store.commit("TOGGLE_REDUCE_SIDEBAR", false);
      this.$store.dispatch("updateSidebarWidth", "default");
      // this.showToggle = false;
    },
    changeLanguage(locale) {
      this.$i18n.locale = locale;
    },
    LinkToSettings() {
      this.$router.push("/settings").catch(() => {});
    },

    setFakeData() {
      if (this.is_fake) {
        this.$store.dispatch("setFakeData", false);
        this.fake_data = false;
      } else {
        this.$store.dispatch("setFakeData", true);
        this.fake_data = true;
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout").then(() => {
        this.$router.replace("/login").catch(() => {});
        // this.$vs.notify({
        //   color: this.notification_color,
        //   text: this.notification_text,
        //   icon: this.notification_icon,
        // });
      });
    },
    async searchLessons() {
      this.$router.push("/search/" + this.keyword);

      this.$vs.loading({ type: "material" });

      await this.$store
        .dispatch("lessonManage/searchLesson", this.keyword)
        .then(() => {
          this.$vs.notify({
            text: this.notification_text,
            icon: this.notification_icon,
            color: this.notification_color,
          });
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
        });

      this.$vs.loading.close(this.$refs.loading);

      this.keyword = "";
    },
    linkToMyproducts() {
      this.$router.push("/library").catch(() => {});
    },
  },
  computed: {
    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"];
      },
    },
    getCurrentLanguage() {
      const locale = this.$i18n.locale;
      if (locale == "en") return { lang: "English" };
      else if (locale == "fr") return { lang: "French" };
      else if (locale == "ch") return { lang: "Chinese" };
      else if (locale == "gr") return { lang: "German" };
      return this.locale;
    },
    notification_text: {
      get() {
        return this.$store.getters["notification_text"];
      },
    },
    show_fake_menu: {
      get() {
        return this.$store.getters["show_fake_menu"];
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

    is_fake: {
      get() {
        return this.$store.getters["is_fake"];
      },
    },
    product_id: function () {
      var id = this.$route.params.product_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    category_id: function () {
      var id = this.$route.params.category_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    lesson_id: function () {
      var id = this.$route.params.lesson_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },

    academy_token: {
      get() {
        return JSON.parse(localStorage.getItem("academy_token"));
      },
    },
    navbar_header_height: {
      get() {
        if(this.current_product.customize_header==undefined )
          return '0px'
        if (
          this.product_id !== "" ||
          this.category_id !== "" ||
          this.lesson_id !== ""
        ) {
          if (
            this.current_product.customize_header.show_announcement &&
            this.current_product.customize_header.show_header
          ) {
            return "50px";
          } else return "0px";
        } else return "0px";
      },
    },

    header_logo_height: {
      get() {
        if(this.current_product.customize_header == undefined) {
          return '50'
        }
        let height = parseInt(
          this.current_product.customize_header.custom_logo_height
        );
        if (isNaN(height) || height == 0) {
          return "50";
        } else {
          return height;
        }
      },
    },

    heading_font_family: {
      get() {
        if (this.current_product.customize_settings !== undefined)
          return this.current_product.customize_settings.heading_font_family
        else
          return ""
      }
    },

    announcement_color: {
      get() {
        if (this.current_product.customize_header.announcement_color == null)        
          return '#1ABC9C';
        else
          return this.current_product.customize_header.announcement_color;
      }
    },

    announcement_text_color: {
      get() {
        if (this.current_product.customize_header.announcement_text_color == null)        
          return '#ffffff';
        else
          return this.current_product.customize_header.announcement_text_color;
      }
    }

  },

};
</script>

<style lang="scss">
.product-announcement {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 101;
}
.product-announcement-text {
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}
.header-logo {
  margin: 2px 0px;
  object-fit: scale-down;
}
</style>
