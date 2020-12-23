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
      <vs-card class=" mb-0">
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
        <form @submit="checkForm" novalidate="true">
          <vs-input
            icon-after="true"
            size="large"
            class="w-100 mb-4 mt-2 vs-input-large"
            icon="person"
            placeholder="Input your Email"
            v-model="email"
            type="email"
          />
          <input
            class="btn-block btn btn-primary submit-button"
            type="submit"
            @click.stop.prevent="checkForm"
            value="Send"
          />
        </form>
        <div class="d-flex justify-content-center mt-3">
          Do you have an account? &nbsp;
          <router-link to="/login"> Log In</router-link>
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
    msg: "Forgot Password",
    rememberme: false,
    email: "",
    errors: [],
    user: new User("", ""),
    logged: false,
  }),
  computed: {
    inputValid() {
      if (this.validEmail(this.email)) {
        return false;
      } else {
        return true;
      }
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
  },

  methods: {
    checkForm: function(e) {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      } else {
        this.$store.dispatch("auth/forgotPassword", this.email).then(() => {
          if (this.status_got) {
            this.$router.push("./resetpassword");
          } else {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          }
        });
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
  created() {
    // let user = JSON.parse(localStorage.getItem('user'));
    // if (user){
    //   this.$router.push('./owners')
    // }
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
