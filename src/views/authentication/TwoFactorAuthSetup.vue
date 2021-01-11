<template>
  <div
    class="mt-2 mb-3"
    style="display: flex;
  justify-content: center;
  align-items: center; "
  >
    <div style="width: 80%; height: 80%;" class="mx-auto">
      <h2 class="ml-3 mt-1">Two-Factor Authentication</h2>
      <div class="mt-2 mb-3 ml-3" style="font-size: 20px;">
        Follow these step to login with extra security.
      </div>
      <vs-row>
        <vs-col vs-lg="12">
          <div class="two-step-setup-title">
            <vs-row>
              <vs-col vs-lg="1">
                <div class="two-step-number">1</div>
              </vs-col>
              <vs-col vs-lg="11">
                <div class="two-step-setup-info px-3">
                  <div class=" ">
                    Install a Two-Factor Authentication app on your phone
                  </div>
                  <div class="mt-2">
                    Get the <strong>Google Authenticator</strong> app from App
                    Store for iOS or Google Play for Android.
                  </div>
                  <div style="text-align:center" class="mt-3">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en"
                      target="”_blank”"
                      class="m-2"
                      ><img
                        src="../../assets/images/logo/google-play-badge.png"
                        alt="Google play logo"
                        style="width: 150px;"
                        title="Google Authenticator from Google Play"
                    /></a>
                    <a
                      href="https://apps.apple.com/us/app/google-authenticator/id388497605"
                      target="”_blank”"
                      class="m-2"
                      ><img
                        src="../../assets/images/logo/app-store-badge.png"
                        alt="Google play logo"
                        style="width: 150px;"
                        title="Google Authenticator from App Store"
                    /></a>
                  </div>
                </div>
              </vs-col>
            </vs-row>
          </div>
        </vs-col>
        <vs-col vs-lg="12" class="mt-3">
          <div class="two-step-setup-title">
            <vs-row>
              <vs-col vs-lg="1">
                <div class="two-step-number">2</div>
              </vs-col>
              <vs-col vs-lg="11">
                <div class="two-step-setup-info px-3">
                  <div class="mt-2">
                    Open the app and scan the QR code below.
                  </div>

                  <vs-row vs-align="center" vs-justify="center">
                    <vs-col
                      vs-lg="6"
                      vs-sm="12"
                      vs-align="center"
                      vs-justify="center"
                      class="d-flex"
                    >
                      <img
                        v-bind:src="fullUrl"
                        alt="QR code"
                        style="width: 200px;"
                      />
                    </vs-col>
                    <vs-col
                      vs-lg="6"
                      vs-sm="12"
                      style=" display: flex;justify-content: center;align-items: center;"
                    >
                      <!-- <div class="mt-1">Or</div> -->
                      <div class="">
                        <div style="text-align: center">
                          Use manual entry key
                        </div>
                        <div class="default-input text-center mt-3">
                          <vs-input
                            type="text"
                            style="width: 250px"
                            label=""
                            class="inputx qrcode_input"
                            disabled
                            placeholder=""
                            v-model="qr_code_key"
                          />
                        </div>
                        <div class="text-center mt-3">
                          <!-- <a v-clipboard:copy="qr_code_key">Click to Copy</a> -->
                          <div
                            class="clipkBoardCopy"
                            v-clipboard:copy="qr_code_key"
                            @click="copyToClipBoard"
                          >
                            Click to copy
                          </div>
                        </div>
                      </div>
                    </vs-col>
                  </vs-row>
                </div>
              </vs-col>
            </vs-row>
          </div>
        </vs-col>
        <vs-col vs-lg="12" class="mt-3">
          <div class="two-step-setup-title">
            <vs-row>
              <vs-col vs-lg="1">
                <div class="two-step-number">3</div>
              </vs-col>
              <vs-col vs-lg="11">
                <div class="two-step-setup-info px-3">
                  <div class="mt-2">
                    Enter the 6 numbers displayed in the Authenticator App in
                    the boxes below.
                  </div>
                  <div class="pf-input-pin__wrapper mt-3">
                    <input
                      class="pf-input-pin__input"
                      max="9"
                      maxlength="1"
                      min="0"
                      id="login2faInputPin-0"
                      tabindex="-1"
                      autocomplete="off"
                      v-model="pincode1"
                      ref="input_pincode1"
                      @keydown="processDeleteKey($event)"
                      @click="processFocus"
                    />
                    <input
                      class="pf-input-pin__input"
                      max="9"
                      maxlength="1"
                      min="0"
                      id="login2faInputPin-1"
                      tabindex="-1"
                      autocomplete="off"
                      v-model="pincode2"
                      ref="input_pincode2"
                      @keydown="processDeleteKey($event)"
                      @click="processFocus"
                    />
                    <input
                      class="pf-input-pin__input"
                      max="9"
                      maxlength="1"
                      min="0"
                      id="login2faInputPin-2"
                      tabindex="-1"
                      autocomplete="off"
                      v-model="pincode3"
                      ref="input_pincode3"
                      @keydown="processDeleteKey($event)"
                      @click="processFocus"
                    />
                    <input
                      class="pf-input-pin__input"
                      max="9"
                      maxlength="1"
                      min="0"
                      id="login2faInputPin-3"
                      tabindex="-1"
                      autocomplete="off"
                      v-model="pincode4"
                      ref="input_pincode4"
                      @keydown="processDeleteKey($event)"
                      @click="processFocus"
                    />
                    <input
                      class="pf-input-pin__input"
                      max="9"
                      maxlength="1"
                      min="0"
                      id="login2faInputPin-4"
                      tabindex="-1"
                      autocomplete="off"
                      v-model="pincode5"
                      ref="input_pincode5"
                      @keydown="processDeleteKey($event)"
                      @click="processFocus"
                    />
                    <input
                      class="pf-input-pin__input"
                      max="9"
                      maxlength="1"
                      min="0"
                      id="login2faInputPin-5"
                      tabindex="0"
                      autocomplete="off"
                      v-model="pincode6"
                      ref="input_pincode6"
                      @keydown="processDeleteKey($event)"
                      @click="processFocus"
                    />
                  </div>
                  <vs-row style="float: right" class="mt-4">
                    <vs-button
                      color="danger"
                      type="flat"
                      class="ml-3"
                      style="float: right;"
                      v-on:click="deleteTwoFactorLogin"
                      v-if="twoFALoggedin"
                      >Disable</vs-button
                    >
                    <vs-button
                      color="#0890FF"
                      type="filled"
                      class="ml-3"
                      style="float: right;"
                      v-on:click="setTwoFactorLogin"
                      >Log in</vs-button
                    >
                  </vs-row>
                </div>
              </vs-col>
            </vs-row>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "TwoFactorAuth",
  data: () => ({
    fullUrl: "",
    qr_code_key: "",
    pincode1: "",
    pincode2: "",
    pincode3: "",
    pincode4: "",
    pincode5: "",
    pincode6: "",
    currentInput: 1,
    otpcode: "",
  }),
  props: {
    getQrCode: Boolean,
  },

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
    twoFALoggedin: {
      get() {
        return this.$store.state.auth.user.data.twoFALoggedin;
      },
    },
    logged_user: {
      get() {
        return this.$store.getters["auth/logged_user"];
      },
    },
  },

  created() {},
  watch: {
    getQrCode: function(newValue) {
      if (newValue) this.getEntryKeyCode();
    },
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
    getEntryKeyCode: function() {
      this.$store
        .dispatch("twofaManage/getTwoFactor", this.otpcode)
        .then(() => {
          if (this.$store.state.twofaManage.twofa_key == "") {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          } else {
            this.qr_code_key = this.$store.state.twofaManage.twofa_key;
            this.buildUrl();
          }
        });
    },
    setTwoFactorLogin: function() {
      this.otpcode =
        this.pincode1 +
        this.pincode2 +
        this.pincode3 +
        this.pincode4 +
        this.pincode5 +
        this.pincode6;
      this.$store
        .dispatch("twofaManage/setTwoFactor", this.otpcode)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.pincode1 = "";
          this.pincode2 = "";
          this.pincode3 = "";
          this.pincode4 = "";
          this.pincode5 = "";
          this.pincode6 = "";
        })
        .catch(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
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
        this.setTwoFactorLogin();
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
    copyToClipBoard() {
      this.$vs.notify({
        color: "primary",
        icon: "info",
        text: "You copyed this key",
      });
    },

    deleteTwoFactorLogin() {
      this.otpcode =
        this.pincode1 +
        this.pincode2 +
        this.pincode3 +
        this.pincode4 +
        this.pincode5 +
        this.pincode6;
      this.$store
        .dispatch("twofaManage/deleteTwoFactor", this.otpcode)
        .then(() => {
          this.$vs.notify({
            color: this.notification_color,
            text: this.notification_text,
            icon: this.notification_icon,
          });
          this.pincode1 = "";
          this.pincode2 = "";
          this.pincode3 = "";
          this.pincode4 = "";
          this.pincode5 = "";
          this.pincode6 = "";
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
    buildUrl: function() {
      this.fullUrl =
        "https://chart.googleapis.com/chart?cht=qr&chs=" +
        400 +
        "x" +
        400 +
        "&chl=" +
        encodeURIComponent(this.qr_code_key);
    },
  },
};
</script>
<style>
.two-step-number {
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  color: white;
  display: inline-block;
  font-weight: bold;
  line-height: 40px;
  margin-right: 5px;
  text-align: center;
  width: 40px;
  background-color: green;
  font-size: 20px;
}

.two-step-setup-info {
  font-size: 20px;
}

.pf-input-pin__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pf-input-pin__input {
  width: 55px;
  height: 55px;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #c5c4c4;
}
.pf-input-pin__input:focus {
  border-color: #288bf5;
}
.pf-input-pin__wrapper input {
  overflow: visible;
  font-family: proxima nova;
}

.pf-input-pin__input:not(:first-of-type) {
  margin-left: 8px;
}
.qrcode_input {
  width: 100%;
  border-radius: 5px;
  border: solid 1px green !important;
}
.clipkBoardCopy:hover {
  color: #404adb;
  cursor: pointer;
  text-decoration: none;
}
.vs-popup--close {
  background-color: transparent !important;
  transition: none !important;
  transform: none !important;
  box-shadow: none !important;
}
</style>
