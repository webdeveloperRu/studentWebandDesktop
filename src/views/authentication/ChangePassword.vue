<template>
  <vs-card class="mb-0">
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
    <form>
      <vs-input
        icon-after="true"
        size="large"
        class="w-100 vs-input-large mb-4"
        type="password"
        icon="lock"
        placeholder="Current Password"
        v-model="pwd"
      />
      <vs-input
        icon-after="true"
        size="large"
        class="w-100 vs-input-large mb-4"
        type="password"
        icon="lock"
        placeholder="New Password"
        v-model="newpwd"
      />
      <vs-input
        icon-after="true"
        size="large"
        class="w-100 vs-input-large mb-4"
        type="password"
        icon="lock"
        placeholder="Confirm New Password"
        v-model="confirm_newpwd"
      />
      <vs-button class="w-100 vs-input-large mb-4" v-on:click="changePassword">
        Change Password</vs-button
      >
    </form>
  </vs-card>
</template>

<script>
export default {
  name: "change-password-box",

  data: () => ({
    msg: "Change Password",
    pwd: "",
    newpwd: "",
    confirm_newpwd: "",
    errors: [],
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
    changePassword: function() {
      this.errors = [];
      if (!this.confirm_newpwd)
        this.errors.push("Confirm New Password required.");
      if (!this.pwd) this.errors.push("Password required.");
      if (!this.newpwd) this.errors.push("New Password required.");
      if (this.newpwd !== this.confirm_newpwd)
        this.errors.push(
          "confirm new password doesn't match with new password"
        );
      if (!this.errors.length) {
        this.$store
          .dispatch("auth/changePassword", [this.pwd, this.newpwd])
          .then(() => {
            this.$vs.dialog({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      }
      if (!this.errors.length) {
        return true;
      }
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
<style></style>
