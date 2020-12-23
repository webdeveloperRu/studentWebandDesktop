import Vue from "vue";
import Vuex from "vuex";
import themeConfig from "@/../themeConfig.js";
import { auth } from "./auth.module";
import { twofaManage } from "./twofactor.module";
import createPersistedState from "vuex-persistedstate";
import { productManage } from "./product.module";
import { categoryManage } from "./category.module";
import { lessonManage } from "./lesson.module";
import { commentManage } from "./comments.module";

Vue.use(Vuex);
/* eslint-disable */
export default new Vuex.Store({
  modules: {
    auth,
    twofaManage,
    productManage,
    categoryManage,
    lessonManage,
    commentManage,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    theme: themeConfig.theme,
    isSidebarActive: false,
    isSidebarReduced: themeConfig.sidebarCollapsed,
    sidebarWidth: "mini",
    themeColor: themeConfig.themeColor,
    error_text: "",
    notification_color: "",
    notification_icon: "",
    notification_text: "",
    loading_status: 0,
    status: {
      inRequest: false,
      got: false,
    },
    custom_warning: "#ff3300",
  },
  mutations: {
    LOADING_STATUS(state, loading_status) {
      state.loading_status = loading_status;
    },
    // REQUEST FAILED
    REQUEST_FAILED(state, error) {
      state.status = {};
      state.notification_icon = "warning";
      state.notification_color = state.custom_warning;
      state.notification_text = error.data.message;
    },
    // Network Error
    NETWORK_ERROR(state) {
      state.status = {};
      state.notification_icon = "warning";
      state.notification_color = state.custom_warning;
      state.notification_text = "Network Connection Error";
    },
    //This is for Sidbar trigger in mobile
    TOGGLE_SIDEBAR_ACTIVE(state, value) {
      state.isSidebarActive = value;
    },
    //This is for Sidebar toggle in desktop
    TOGGLE_REDUCE_SIDEBAR(state, val) {
      state.isSidebarReduced = val;
    },
    UPDATE_THEME(state, val) {
      state.theme = val;
    },
    UPDATE_THEME_COLOR(state, val) {
      state.themeColor = val;
    },
    UPDATE_SIDEBAR_WIDTH(state, width) {
      state.sidebarWidth = width;
    },
    RESET_MODULE(state) {
      state.error_text = "";
    },
  },
  actions: {
    updateSidebarWidth({ commit }, width) {
      commit("UPDATE_SIDEBAR_WIDTH", width);
    },
    loadingStatus({ commit }, loading_status) {
      commit("LOADING_STATUS", loading_status);
    },
  },
  getters: {
    notification_text: (state) => state.notification_text,
    inRequest: (state) => state.status.inRequest,
    status_got: (state) => state.status.got,
    notification_color: (state) => state.notification_color,
    notification_icon: (state) => state.notification_icon,
    loading_status: (state) => state.loading_status,
  },
});
