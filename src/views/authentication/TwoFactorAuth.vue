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
      class="twofactor-box"
      vs-lg="9"
      vs-xs="12"
    >
      <vs-card>
        <h1 class="ml-3 mt-3">Two-Factor Authentication</h1>
        <div class="mt-2 mb-5 ml-3" style="font-size: 20px">
          Please enter the 2fa code from your mobile device below.
        </div>
        <br />
        <div class="pf-input-pin__wrapper mt-3">
          <input
            class="two-factor-large-input"
            maxlength="1"
            id="login2faInputPin-0"
            tabindex="-1"
            autocomplete="off"
            v-model="pincode1"
            ref="input_pincode1"
            @keydown="processDeleteKey($event)"
            @click="processFocus"
          />
          <input
            class="two-factor-large-input ml-2"
            maxlength="1"
            id="login2faInputPin-1"
            tabindex="-1"
            autocomplete="off"
            v-model="pincode2"
            ref="input_pincode2"
            @keydown="processDeleteKey($event)"
            @click="processFocus"
          />
          <input
            class="two-factor-large-input ml-2"
            maxlength="1"
            id="login2faInputPin-2"
            tabindex="-1"
            autocomplete="off"
            v-model="pincode3"
            ref="input_pincode3"
            @keydown="processDeleteKey($event)"
            @click="processFocus"
          />
          <input
            class="two-factor-large-input ml-2"
            maxlength="1"
            id="login2faInputPin-3"
            tabindex="-1"
            autocomplete="off"
            v-model="pincode4"
            ref="input_pincode4"
            @keydown="processDeleteKey($event)"
            @click="processFocus"
          />
          <input
            class="two-factor-large-input ml-2"
            maxlength="1"
            id="login2faInputPin-4"
            tabindex="-1"
            autocomplete="off"
            v-model="pincode5"
            ref="input_pincode5"
            @keydown="processDeleteKey($event)"
            @click="processFocus"
          />
          <input
            class="two-factor-large-input ml-2"
            maxlength="1"
            id="login2faInputPin-5"
            tabindex="0"
            autocomplete="off"
            v-model="pincode6"
            ref="input_pincode6"
            @keydown="processDeleteKey($event)"
            @click="processFocus"
          />
        </div>
        <br />
        <button class="mt-5 two-factor-button mb-4" v-on:click="login">
          Log in
        </button>
      </vs-card>
    </vs-col>
  </vs-row>
</template>
<script>
export default {
  name: "TwoFactorAuth",
  data: () => ({
    pincode1: "",
    pincode2: "",
    pincode3: "",
    pincode4: "",
    pincode5: "",
    pincode6: "",
    currentInput: 1,
    otpcode: "",
  }),

  computed: {
    twofa_logged: {
      get() {
        return this.$store.getters["auth/twofa_logged"];
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

    status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },

    login_userinfo: {
      get() {
        return this.$store.getters["auth/login_userinfo"];
      },
    },
    rememberme: {
      get() {
        return this.$store.getters["auth/rememberme"];
      },
    },
  },

  watch: {
    pincode1: function(newvalue, oldvalue) {
      if (this.currentInput === 1) {
        if (newvalue.length !== 0) {
          if (!isNaN(newvalue[this.pincode1.length - 1])) {
            this.pincode1 = newvalue;
            this.$refs.input_pincode2.focus();
            this.currentInput = 2;
          } else {
            this.pincode1 = oldvalue;
            this.currentInput = 1;
          }
        }
      }
    },
    pincode2: function(newvalue, oldvalue) {
      if (this.currentInput === 2) {
        if (newvalue.length !== 0) {
          if (!isNaN(newvalue[this.pincode2.length - 1])) {
            this.pincode2 = newvalue;
            this.$refs.input_pincode3.focus();
            this.currentInput = 3;
          } else {
            this.pincode2 = oldvalue;
          }
        }
      }
    },

    pincode3: function(newvalue, oldvalue) {
      if (this.currentInput === 3) {
        if (newvalue.length !== 0) {
          if (!isNaN(newvalue[this.pincode3.length - 1])) {
            this.pincode3 = newvalue;
            this.$refs.input_pincode4.focus();
            this.currentInput = 4;
          } else {
            this.pincode3 = oldvalue;
          }
        }
      }
    },
    pincode4: function(newvalue, oldvalue) {
      if (this.currentInput === 4) {
        if (newvalue.length !== 0) {
          if (!isNaN(newvalue[this.pincode4.length - 1])) {
            this.pincode4 = newvalue;
            this.$refs.input_pincode5.focus();
            this.currentInput = 5;
          } else {
            this.pincode4 = oldvalue;
          }
        }
      }
    },
    pincode5: function(newvalue, oldvalue) {
      if (this.currentInput === 5) {
        if (newvalue.length !== 0) {
          if (!isNaN(newvalue[this.pincode5.length - 1])) {
            this.pincode5 = newvalue;
            this.$refs.input_pincode6.focus();
            this.currentInput = 6;
          } else {
            this.pincode5 = oldvalue;
          }
        }
      }
    },
    pincode6: function(newvalue, oldvalue) {
      if (this.currentInput === 6) {
        if (newvalue.length !== 0) {
          if (!isNaN(newvalue[this.pincode6.length - 1])) {
            this.pincode6 = newvalue;
          } else {
            this.pincode6 = oldvalue;
          }
        }
      }
    },
  },
  methods: {
    login: function() {
      this.otpcode =
        this.pincode1 +
        this.pincode2 +
        this.pincode3 +
        this.pincode4 +
        this.pincode5 +
        this.pincode6;
      this.login_userinfo.otp = this.otpcode;
      this.$store
        .dispatch("auth/login", [this.login_userinfo, this.rememberme])
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
    },
    logintoMainLayout() {
      this.$router.push({
        path: "submissions-list",
      });
    },
    searchEmptyPostion() {
      if (this.pincode1 === "") return 1;
      if (this.pincode2 === "") return 2;
      if (this.pincode3 === "") return 3;
      if (this.pincode4 === "") return 4;
      if (this.pincode5 === "") return 5;
      if (this.pincode6 === "") return 6;
    },
    processFocus: function() {
      this.currentInput = this.searchEmptyPostion();
      this.gotoCurrentInput();
    },
    processDeleteKey: function($event) {
      this.currentInput = this.searchEmptyPostion();
      if ($event.keyCode === 8) {
        switch (this.currentInput) {
          case 6:
            if (this.pincode6 === "") {
              this.currentInput = this.currentInput - 1;
              this.gotoCurrentInput();
            }
            this.gotoCurrentInput();
            break;
          case 2:
            if (this.pincode2 === "") {
              this.currentInput = this.currentInput - 1;
              this.gotoCurrentInput();
            }
            this.gotoCurrentInput();
            break;
          case 3:
            if (this.pincode3 === "") {
              this.currentInput = this.currentInput - 1;
              this.gotoCurrentInput();
            }
            this.gotoCurrentInput();
            break;
          case 4:
            if (this.pincode4 === "") {
              this.currentInput = this.currentInput - 1;
              this.gotoCurrentInput();
            }
            this.gotoCurrentInput();
            break;
          case 5:
            if (this.pincode5 === "") {
              this.currentInput = this.currentInput - 1;
              this.gotoCurrentInput();
            }
            this.gotoCurrentInput();
            break;
        }
      }
      if ($event.keyCode === 13 && this.pincode6 != "") {
        this.login();
      }
      if ($event.keyCode >= 48 && $event.keyCode <= 57) {
        switch (this.currentInput) {
          case 1:
            if (this.pincode1 !== "") this.currentInput = this.currentInput + 1;
            this.gotoCurrentInput();
            break;
          case 2:
            if (this.pincode2 !== "") this.currentInput = this.currentInput + 1;
            this.gotoCurrentInput();
            break;
          case 3:
            if (this.pincode3 !== "") this.currentInput = this.currentInput + 1;
            this.gotoCurrentInput();
            break;
          case 4:
            if (this.pincode4 !== "") this.currentInput = this.currentInput + 1;
            this.gotoCurrentInput();
            break;
          case 5:
            if (this.pincode5 !== "") this.currentInput = this.currentInput + 1;
            this.gotoCurrentInput();
            break;
        }
      }
      // if(this.currentInput!== 6 && this.)
    },
    gotoCurrentInput: function() {
      switch (this.currentInput) {
        case 1:
          this.$refs.input_pincode1.focus();
          break;
        case 2:
          this.$refs.input_pincode2.focus();
          break;
        case 3:
          this.$refs.input_pincode3.focus();
          break;
        case 4:
          this.$refs.input_pincode4.focus();
          break;
        case 5:
          this.$refs.input_pincode5.focus();
          break;
        case 6:
          this.$refs.input_pincode6.focus();
          break;
      }
    },
  },
};
</script>

<style>
.two-factor-button {
  background: rgb(8, 144, 255);
  box-shadow: rgb(8, 144, 255) 0px 8px 25px -8px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 20px;
  float: right;
}
.pf-input-pin__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.two-factor-large-input {
  width: 60px;
  height: 60px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #e5e5e5;
  font-size: 30px;
}
.two-factor-large-input:focus {
  border-color: #288bf5;
}

.pf-input-pin__wrapper input {
  overflow: visible;
  font-family: proxima nova;
}

.pf-input-pin__input:not(:first-of-type) {
  margin-left: 8px;
}
.twofactor-box {
  max-width: 600px;
}
.login-register-bg {
  margin: 0 auto;
}
@media only screen and (max-width: 500px) {
  .two-factor-large-input {
    width: 45px;
    height: 45px;
    font-size: 25px;
  }
}
</style>
