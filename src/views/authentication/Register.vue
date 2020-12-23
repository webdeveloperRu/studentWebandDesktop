<template>
  <vs-row
    vs-justify="center"
    vs-align="center"
    class="full-height login-register-bg"
  >
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      class="login-register-box"
      vs-lg="12"
      vs-xs="12"
    >
      <vs-card class="mb-0">
        <div slot="header">
          <h3 class="mb-1">{{ msg }}</h3>
          <p class="mb-0">Welcome back, please register to your account.</p>
        </div>
        <vs-alert
          v-if="errors.length"
          class="mb-3 mt-2"
          color="danger"
          :active="inputValid"
        >
          <b>Please correct the following error(s):</b>
          <ul class="common-list">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </vs-alert>
        <form @submit="checkForm" action="/login" novalidate="true">
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 mb-4 mt-2 vs-input-large"
            icon="ti-user"
            icon-pack="ti"
            icon-no-border
            placeholder="Full Name"
            v-model="fullname"
          />
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 mb-4 mt-2 vs-input-large"
            icon="mail"
            placeholder="Your Email"
            v-model="email"
            type="email"
          />
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 vs-input-large mb-4"
            type="password"
            icon="lock"
            placeholder="Password"
            v-model="pwd"
          />
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 vs-input-large"
            type="password"
            icon="lock"
            placeholder="Confirm Password"
            v-model="confirm_pwd"
          />
          <input
            class="btn-block btn btn-primary submit-button mt-3"
            type="submit"
            value="Register"
          />
        </form>
        <div class="d-flex justify-content-center mt-3">
          Do you have an account? &nbsp;<router-link to="/login">
            Login</router-link
          >
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import User from "../../models/user";
export default {
  name: "login-register-box",
  data: () => ({
    msg: "Register Here",
    rememberme: false,
    fullname: "",
    email: "",
    pwd: "",
    confirm_pwd: "",
    errors: [],
    user: new User("", ""),
  }),
  computed: {
    inputValid() {
      if (
        this.validEmail(this.email) &&
        this.pwd &&
        this.confirm_pwd &&
        this.pwd == this.confirm_pwd
      ) {
        return false;
      } else {
        return true;
      }
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
    user_logged: {
      get() {
        return this.$store.getters["auth/user_logged"];
      },
    },
  },

  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (!this.fullname) this.errors.push("Full Name required.");
      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }
      if (!this.pwd) this.errors.push("Password required.");
      if (!this.confirm_pwd) this.errors.push("Confirm Password required.");
      if (this.pwd !== this.confirm_pwd)
        this.errors.push("confirm password doesn't match");
      if (!this.errors.length) {
        this.user.name = this.fullname;
        this.user.email = this.email;
        this.user.password = this.pwd;
        this.$store
          .dispatch("auth/register", this.user)
          .then(() => {
            if (this.user_logged) {
              this.$router.push("./login");
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            } else {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          })
          .catch(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }
      e.preventDefault();
    },
    /* eslint-disable */
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    /* eslint-enable */
  },
};
</script>
<style>
.login-register-bg {
  margin: 0 auto;
  /* background:url(../../assets/images/background/auth-bg.jpg) no-repeat center center; */
}
.login-register-box {
  max-width: 400px;
}
</style>
