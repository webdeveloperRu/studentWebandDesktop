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
          <p class="mb-0">Welcome back, please login to your account.</p>
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
        <form @submit="checkForm" novalidate="true">
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 mb-4 mt-2 vs-input-large"
            icon="person"
            placeholder="Email ID"
            v-model="email"
            type="email"
          />
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 vs-input-large"
            type="password"
            icon="lock"
            placeholder="Password"
            v-model="pwd"
          />
          <div class="d-flex pt-3 pb-3">
            <vs-checkbox v-model="rememberme">Remember me?</vs-checkbox>
            <router-link class="ml-auto forgot-passwrd" to="/forgotpassword">
              Forgot Password</router-link
            >
          </div>
          <input
            class="btn-block btn btn-primary submit-button"
            type="submit"
            @click.stop.prevent="checkForm"
            value="Login"
          />
        </form>
        <div class="d-flex justify-content-center mt-3">
          Don't have an account? &nbsp;
          <router-link to="/register"> Create an Account</router-link>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import User from "../../models/user";
export default {
  name: "Login",
  data: () => ({
    msg: "Login Here",
    rememberme: false,
    email: "",
    pwd: "",
    errors: [],
    user: new User("", ""),
    otp: "",
  }),

  computed: {
    inputValid() {
      if (this.validEmail(this.email) && this.pwd && this.user_logged) {
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

    twoFALoggedin: {
      get() {
        return this.$store.getters["auth/twoFALoggedin"];
      },
    },

    is_disabled: {
      get() {
        return this.$store.getters["auth/is_disabled"];
      },
    },
    logged_user: {
      get() {
        return this.$store.getters["auth/logged_user"];
      },
    },
    academy_token: {
      get() {
        return JSON.parse(localStorage.getItem("academy_token"));
      },
    },

  },
  created() {
    if (this.logged_user) this.$router.push(window.location.pathname).catch(() => {});
    if (this.academy_token != null)  this.$router.push(window.location.pathname).catch(() => {});

  },

  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      } else {
        if (!this.pwd) this.errors.push("Password required.");
        else {
          this.user.email = this.email;
          this.user.password = this.pwd;
          this.user.otp = this.otp;
          this.$store
            .dispatch("auth/login", [this.user, this.rememberme])
            .then(() => {
              if (this.user_logged) {
                if (!this.is_disabled) {
                  this.$router.push("/library");
                } else {
                  this.$vs.notify({
                    color: "#ff3300",
                    text: "This user is disabled now",
                    icon: "warning",
                  });
                }
              } else {
                if (this.notification_text == "otp code is requested") {
                  this.$router.push("./twofactorauth");
                } else {
                  this.$vs.notify({
                    color: this.notification_color,
                    text: this.notification_text,
                    icon: this.notification_icon,
                  });
                }
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
      }

      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
    },
    /* eslint-disable */
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
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
.forgot-passwrd {
  color: #3068eb;
}
.forgot-passwrd:hover {
  cursor: pointer;
}
</style>
