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
            class="w-100 vs-input-large mb-4"
            type="password"
            icon="lock"
            placeholder="Confirm Password"
            v-model="confirm_pwd"
          />
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 vs-input-large"
            placeholder="Email Code"
            v-model="confirm_email_code"
          />
          <input
            class="btn-block btn btn-primary submit-button mt-3"
            type="submit"
            value="Reset Password"
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
    msg: "Reset Password",
    rememberme: false,
    email: "",
    pwd: "",
    confirm_pwd: "",
    confirm_email_code: "",
    errors: [],
    user: new User("", ""),
  }),
  computed: {
    inputValid() {
      if (
        this.validEmail(this.email) &&
        this.pwd &&
        this.confirm_pwd &&
        this.pwd == this.confirm_pwd &&
        this.confirm_email_code
      ) {
        return false;
      } else {
        return true;
      }
    },
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
  },

  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }
      if (!this.confirm_pwd) this.errors.push("Confirm Password required.");
      if (!this.pwd) this.errors.push("Password required.");
      if (!this.confirm_email_code)
        this.errors.push("Confirm Email Code required.");
      if (this.pwd !== this.confirm_pwd)
        this.errors.push("confirm password doesn't match");
      if (!this.errors.length) {
        this.user.email = this.email;
        this.user.password = this.pwd;
        this.$store
          .dispatch("auth/resetPassword", [this.user, this.confirm_email_code])
          .then(() => {
            if (this.status_got) {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
              this.$router.push("./login");
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
  created() {
    this.email = this.$store.state.auth.email_resetpassword;
    this.confirm_email_code = this.$store.state.auth.email_code;
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
