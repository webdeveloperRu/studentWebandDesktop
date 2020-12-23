<template>
  <vs-row vs-justify="center" class="primary-font">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="8"
      vs-sm="12"
      vs-xs="12"
      class="mb-3"
      code-toggler
    >
      <span
        @click="backToMyproducts"
        style="cursor: pointer; user-select: none"
        class="ml-2 mb-5 mt-2 primary-font"
        ><i class="ti-angle-left" style="font-size: 14px"></i> My Products</span
      >
    </vs-col>
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="8"
      vs-sm="12"
      vs-xs="12"
      code-toggler
    >
      <vs-row vs-justify="center">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Profile Settings</h3>
          <div class="mt-2">Change your basic profile information.</div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="Full Name"
              placeholder="Full Name"
              v-model="full_name"
              class="w-100"
            />
            <vs-input
              label="E-mail"
              placeholder="example@gmail.com"
              v-model="account_email"
              class="w-100 mt-3"
            />
            <!-- <vs-input
              label="Time Zone"
              placeholder="Time Zone"
              v-model="time_zone"
              class="w-100 mt-3"
            /> -->
            <vs-select
              class="w-100 mt-3"
              label="Time zone"
              placeholder="Please select your timezone"
              v-model="time_zone"
            >
              <vs-select-item
                :key="index"
                :value="item.value"
                :text="item.text"
                v-for="(item, index) in time_zones"
              />
            </vs-select>

            <!-- <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="product_updated"
              >Please notify me about updates to my products.
              </vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="post_created"
              >Please notify me when a reply to one of my posts or comments is created.
              </vs-checkbox
            >
            <vs-checkbox
              class="justify-content-start mt-3"
              size="small"
              v-model="new_product"
              >Please email me about new products and promotions.
              </vs-checkbox
            > -->

            <label class="ml-2 mt-5"><b>Avatar</b></label>
            <div
              class="d-flex setting-avatar"
              style="align-items: center; justify-content: flex-start"
            >
              <div style="width: 100px;">
                <vs-avatar size="100px" :src="avatar_url"></vs-avatar>
              </div>
              <div class="ml-3">
                <div class="mb-3">
                  Recommended dimensions of
                  <strong>100<i class="mdi mdi-close"></i>100</strong>
                </div>
                <vs-row vs-justify="center" vs-align="center">
                  <vs-col
                    vs-justify="center"
                    vs-align="center"
                    vs-lg="6"
                    vs-sm="12"
                  >
                    <label class="avatar-select-button">
                      <input
                        type="file"
                        style="overflow: hidden"
                        class="custom-file-input"
                        accept="image/png, image/jpeg"
                        @change="onSelectAvatar"
                      />
                      Select Image
                    </label>
                  </vs-col>
                  <vs-col
                    vs-justify="center"
                    vs-align="center"
                    vs-lg="6"
                    vs-sm="12"
                  >
                    <vs-button
                      @click="onClickRemoveAvatar"
                      color="danger"
                      type="flat"
                      >Remove Image</vs-button
                    >
                  </vs-col>
                </vs-row>
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
      <div style="float: right; margin-bottom: 20px;">
        <vs-button @click="updateSettings" class="mt-3"> Save </vs-button>
      </div>

      <vs-divider></vs-divider>

      <!-- 
        @@socail profile 
      -->
      <!-- <vs-row vs-justify="center" class="mt-4">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Social Profile</h3>
          <div class="mt-2">Edit information displayed publicly in communities.</div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <label>Bio</label>
            <vs-textarea
              placeholder=""
              v-model="account_bio"
              class="w-100"
            />
            <vs-input
              label="Location"
              v-model="account_location"
              class="w-100 mt-3"
            />
          </vs-card>
        </vs-col>
      </vs-row>

      <vs-divider></vs-divider> -->

      <!--       
        @ Password
      -->
      <vs-row vs-justify="center" class="mt-4">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Password</h3>
          <div class="mt-2">Change your password.</div>
          <div class="mt-2">
            Leave this blank to keep your current password.
          </div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-input
              label="Current Password"
              type="password"
              v-model="current_password"
              class="w-100 mt-3"
            />
            <!-- <span class="ml-1" style="color: dodgerblue">Forgot?</span> -->
            <vs-input
              label="New Password"
              type="password"
              v-model="new_password"
              class="w-100 mt-3"
            />
            <vs-input
              label="Verify Password"
              type="password"
              v-model="verify_password"
              class="w-100 mt-3"
            />
          </vs-card>
        </vs-col>
      </vs-row>
      <!-- <vs-divider></vs-divider> -->

      <!-- 
        @ purchase history
      -->
      <!-- <vs-row vs-justify="center" class="mt-4">
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="4"
          vs-xs="12"
          code-toggler
        >
          <h3>Purchase History</h3>
          <div class="mt-2">The Offers you have purchased and the Products you have been granted access to.</div>
        </vs-col>
        <vs-col
          type="flex"
          vs-justify="center"
          vs-align="center"
          vs-lg="8"
          vs-xs="12"
          code-toggler
        >
          <vs-card class="cardx">
            <vs-row vs-justify="center" class="m-2 p-3" style="background-color: #f1f1f1; border: 1px solid #cccccc; border-radius: 5px">
              <vs-col
                class="mt-1"
                type="flex"
                vs-justify="center"
                vs-align="center"
                vs-lg="6"
                vs-sm="12"
                code-toggler
              >
                <div><strong>Purchased</strong></div>
                <span>December 3, 2020</span>
              </vs-col>
              <vs-col
                class="mt-1"
                type="flex"
                vs-justify="center"
                vs-align="center"
                vs-lg="6"
                vs-sm="12"
                code-toggler
              >
                <div><strong>Offer</strong></div>
                <span>Offer Name</span>
              </vs-col>
              <vs-col
                class="mt-3"
                type="flex"
                vs-justify="center"
                vs-align="center"
                vs-lg="6"
                vs-sm="12"
                code-toggler
              >
                <div><strong>Price</strong></div>
                <span>free</span>
              </vs-col>
              <vs-col
                class="mt-3"
                type="flex"
                vs-justify="center"
                vs-align="center"
                vs-lg="6"
                vs-sm="12"
                code-toggler
              >
                <div><strong>Product</strong></div>
                <span>Product Name</span>
              </vs-col>
            </vs-row>
          </vs-card>
        </vs-col>
      </vs-row> -->
      <div style="float: right">
        <vs-button @click="changePassword" class="mt-3">Save</vs-button>
      </div>
    </vs-col>
  </vs-row>
</template>
<script>
import time_zone from "../../models/time_zone";
export default {
  name: "Settings",

  data: () => ({
    full_name: "",
    account_email: "",
    // product_updated: false,
    // post_created: false,
    // new_product: false,
    // account_time_zone: 0,
    time_zone: "Please select your time zone.",
    time_zones: time_zone.time_zones,
    // account_bio: "",
    // account_location: "",
    avatar_url: "",
    avatar_file: null,
    updated_avatar: false,
    current_password: "",
    new_password: "",
    verify_password: "",
  }),

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

    user_settings: {
      get() {
        return this.$store.getters["auth/user_settings"];
      },
    },
  },

  created() {
    if (this.user_logged) {
      this.getSettings();
    } else this.$router.push("./login");
  },

  methods: {
    getSettings() {
      this.$store
        .dispatch("auth/getSettings")
        .then(() => {
          this.setSettings();
          if (this.notification_text == "apikey is invalid") {
            this.$router.replace("/login");
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

    setSettings() {
      this.full_name = this.user_settings.name;
      this.account_email = this.user_settings.email;
      this.time_zone = this.user_settings.time_zone;
      this.avatar_url = this.user_settings.avatar;
    },

    updateSettings() {
      let update_settings = {
        name: this.full_name,
        email: this.account_email,
        time_zone: this.time_zone,
        avatar: this.avatar_file,
      };

      let update_settings_temp = {
        name: this.full_name,
        email: this.account_email,
        time_zone: this.time_zone,
        avatar: this.avatar_url,
      };

      this.$store.dispatch("auth/setCurrentSetting", update_settings_temp);

      this.$store
        .dispatch("auth/updateSettings", update_settings)
        .then(() => {
          if (this.avatar_file == null && this.avatar_url == "") {
            this.$store.dispatch("auth/removeAvatar").then(() => {
              this.getSettings();
              // this.$vs.notify({
              //   text: this.notification_text,
              //   icon: this.notification_icon,
              //   color: this.notification_color,
              // })
            });
          } else this.getSettings();

          this.$store.dispatch("auth/updateUserData", this.user_settings);

          // this.setSettings();

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

      this.avatar_file = null;
    },

    changePassword() {
      this.$store
        .dispatch("auth/changePassword", [
          this.current_password,
          this.new_password,
          this.verify_password,
        ])
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
    },

    onSelectAvatar(e) {
      const file = e.target.files[0];
      if (file !== undefined) {
        this.avatar_file = file;
        this.avatar_url = URL.createObjectURL(file);
        this.updated_avatar = true;
      }
    },

    onClickRemoveAvatar() {
      this.avatar_url = "";
      this.updated_avatar = true;
      this.avatar_file = null;
    },
    backToMyproducts() {
      this.$router.push("/library");
    },
  },
};
</script>
<style>
.avatar-select-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  cursor: pointer;
  margin: 0;
  padding: 0 10px;
  color: #0043d3;
  background-color: white;
  border: 1px solid #0043d3;
  border-radius: 0.3rem;
}
.avatar-select-button .custom-file-input {
  width: 300px;
}
input[type="file"] {
  display: none;
}
.con-vs-checkbox {
  display: -webkit-box;
}

@media only screen and (max-width: 600px) {
  /* .setting-avatar .con-vs-avatar {
     width: 60px !important;
     height: 60px !important;
   } */
}
</style>
