import AuthService from "../services/auth.service";
import store from ".";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? {
      status: {
        loggedIn: true,
      },
      user,
      email_code: "",
      email_resetpassword: "",
      user_log: "",
      twofa_logged: false,
      login_userinfo: null,
      rememberme: false,
      user_settings: [],
    }
  : {
      status: {
        loggedIn: false,
      },
      user: null,
      email_code: "",
      email_resetpassword: "",
      user_log: "",
      twofa_logged: false,
      login_userinfo: null,
      rememberme: false,
      user_settings: [],
    };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, [user, rememberme]) {
      return AuthService.login(user, rememberme)
        .then((res) => {
          if (res.status == 200) {
            commit("loginSuccess", res);
          } else if (
            res.response.status == 401 &&
            res.response.data.message == "otp code is requested"
          ) {
            commit("setTwoFactorLogIn", {
              user,
              rememberme,
            });
            commit("loginFailed", res.response);
          } else {
            if (res.response == undefined) {
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            } else {
              commit("loginFailed", res.response);
            }
          }
        })
        .catch((err) => {
          commit("loginFailed", err);
        });
    },

    logout({ commit }) {
      return AuthService.logout().then(
        (res) => {
          if (res.status == 200) {
            commit("twofaManage/RESET_MODULE", null, {
              root: true,
            });
            commit("productManage/RESET_MODULE", null, {
              root: true,
            });
            commit("categoryManage/RESET_MODULE", null, {
              root: true,
            });
            commit("lessonManage/RESET_MODULE", null, {
              root: true,
            });
            commit("commentManage/RESET_MODULE", null, {
              root: true,
            });
            commit("RESET_MODULE", null, {
              root: true,
            });
            commit("RESET_MODULE");
            commit("logoutSuccess", res);
          } else {
            commit("logoutFailed", res);
          }
        },
        (error) => {
          commit("logoutFailed", error.response);
        }
      );
    },

    register({ commit }, user) {
      return AuthService.register(user).then(
        (res) => {
          if (res.status == 200) {
            commit("registerSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    forgotPassword({ commit }, useremail) {
      return AuthService.forgotPassword(useremail).then(
        (res) => {
          if (res.status == 200) {
            commit("forgotPasswordSuccess", [res, useremail]);
          } else {
            commit("forgotPasswordFailed", res.response);
          }
        },
        (error) => {
          commit("forgotPasswordFailed", error.response);
        }
      );
    },

    resetPassword({ commit }, [user, emailcode]) {
      return AuthService.resetPassword(user, emailcode).then(
        (res) => {
          if (res.status == 200) {
            commit("resetPasswordSuccess", res);
          } else {
            commit("resetPasswordFailed", res.response);
          }
        },
        (error) => {
          commit("resetPasswordFailed", error.response);
        }
      );
    },

    changePassword({ commit }, [password, newpassword, verifypassword]) {
      return AuthService.changePassword(
        password,
        newpassword,
        verifypassword
      ).then(
        (res) => {
          if (res.success == true) {
            commit("changePasswordSuccess", res);
          } else {
            commit("changePasswordFailed", res.response);
          }
        },
        (error) => {
          commit("changePasswordFailed", error.response);
        }
      );
    },

    userLog({ commit }) {
      return AuthService.userLog().then(
        (res) => {
          if (res.status == 200) {
            commit("userLogSuccess");
          } else {
            commit("userLogFailed", res.response);
          }
        },
        (error) => {
          commit("userLogFailed", error.response);
        }
      );
    },

    getSettings({ commit }) {
      return AuthService.getSettings().then(
        (res) => {
          if (res.status == 200) {
            commit("getSettingsSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    updateSettings({ commit }, user_settings) {
      return AuthService.updateSettings(user_settings).then(
        (res) => {
          if (res.status == 200) {
            commit("updateSettingsSuccess");
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    removeAvatar({ commit }) {
      return AuthService.removeAvatar().then(
        (res) => {
          if (res.status == 200) {
            // commit('removeAvatarSuccess')
          } else {
            if (res.response == undefined) {
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            } else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              commit("removeAvatarSuccess", res.response.data.message);
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

    setCurrentSetting({ commit }, user_settings) {
      commit("setCurrentSetting", user_settings);
    },

    updateUserData({ commit }, user_settings) {
      commit("updateUserData", user_settings);
    },
  },

  getters: {
    user_logged: (state) => state.status.loggedIn,
    email_code: (state) => state.email_code,
    email_resetpassword: (state) => state.email_resetpassword,
    twofa_logged: (state) => {
      if (state.status.loggedIn) {
        return state.user.data.twoFALoggedin;
      } else {
        return null;
      }
    },
    logged_user: (state) => state.user,
    is_disabled: (state) => {
      if (state.status.loggedIn) {
        return state.user.data.is_disabled;
      } else {
        return null;
      }
    },
    user_log: (state) => state.user_log,
    twofa_login: (state) => state.twofa_login,
    login_userinfo: (state) => state.login_userinfo,
    rememberme: (state) => state.rememberme,
    user_settings: (state) => state.user_settings,
  },

  mutations: {
    loginSuccess(state, res) {
      state.status.loggedIn = true;
      state.user = res.data;
      state.twofa_login = false;
      state.login_userinfo = res.data.data;
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "Login Success!";
    },

    updateSettingsSuccess() {
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text =
        "User profile settings are successfully updated.";
    },

    loginFailed(state, error) {
      state.status.loggedIn = false;
      state.user = null;
      store.state.notification_icon = "warning";
      store.state.notification_color = "#ff3300";
      store.state.notification_text = error.data.message;
    },

    logoutSuccess(state) {
      state.status.loggedIn = false;
      state.user = null;
      store.state.notification_text = "";
    },

    logoutFailed(state) {
      state.status.loggedIn = false;
      state.user = null;
      store.state.notification_text = "";
    },

    registerSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "User successfully registered!";
    },

    forgotPasswordSuccess(state, [res, useremail]) {
      state.res = user;
      store.state.status = {
        got: true,
      };
      state.email_code = res.data.resetcode;
      state.email_resetpassword = useremail;
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "";
    },

    forgotPasswordFailed(state, error) {
      store.state.status = {};
      store.state.notification_icon = "warning";
      store.state.notification_color = "#ff3300";
      store.state.notification_text = error.data.message;
      state.email_resetpassword = "";
    },

    resetPasswordSuccess(state) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      state.email_code = "";
      state.email_resetpassword = "";
      store.state.notification_text = "Password successfully reset!";
    },

    resetPasswordFailed(state, error) {
      store.state.status = {};
      state.email_code = "";
      state.email_resetpassword = "";
      store.state.notification_icon = "warning";
      store.state.notification_color = "#ff3300";
      store.state.notification_text = error.data.message;
    },

    changePasswordSuccess() {
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "password changed successfuly";
    },

    changePasswordFailed(state, error) {
      store.state.notification_icon = "warning";
      store.state.notification_color = "#ff3300";
      store.state.notification_text = error.data.message;
    },

    RESET_MODULE(state) {
      Object.assign(state, initialState);
    },

    userLogSuccess() {},

    userLogFailed() {},

    setTwoFactorLogIn(state, { user, rememberme }) {
      state.login_userinfo = user;
      state.rememberme = rememberme;
    },

    getSettingsSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      state.user_settings = res.data;
      state.user.data.name = res.data.name;
      state.user.data.email = res.data.email;
      state.user.data.avatar = res.data.avatar;
    },

    setCurrentSetting(state, user_settings) {
      state.user_settings = user_settings;
    },
    updateUserData(state, user_settings) {
      state.user.data.name = user_settings.name;
      state.user.data.email = user_settings.email;
      state.user.data.avatar = user_settings.avatar;
    },
    removeAvatarSuccess(state, message) {
      if (message == "Internal Server Error") {
        store.state.notification_icon = "info";
        store.state.notification_color = "primary";
        store.state.notification_text = "Avatar Image Deleted!";
      }
    },
  },
};
