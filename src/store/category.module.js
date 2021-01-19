import CategoryService from "../services/category.service";
import store from "./index";
const initialState = {
  current_category: [],
};
export const categoryManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get category for id -----------------
     */
    getCategoryByProductID({ commit }, category_id) {
      return CategoryService.getCategoryByProductID(category_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getCategoryByProductIDSuccess", res);
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

        /**
     * ---------get category for id -----------------
     */
    getCategoryByProductIDPreview({ commit }, category_id) {
      return CategoryService.getCategoryByProductIDPreview(category_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getCategoryByProductIDSuccess", res);
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

    /**
     * ---------get category for id demo-----------------
     */
    getCategoryByProductIDDemo({ commit }, category_id) {
      return CategoryService.getCategoryByProductIDDemo(category_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getCategoryByProductIDSuccess", res);
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

    setCurrentCategory({ commit }, category) {
      commit("setCurrentCategory", category);
    },
  },

  getters: {
    current_category: (state) => state.current_category,
  },

  mutations: {
    // /**
    //  * ---------get categories for product id mutation ----------------
    //  */
    getCategoryByProductIDSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_text = "Categories successfully got!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.productManage.category_list = res.data.data;
      if (store.state.productManage.category_list == undefined)
        store.state.productManage.category_list = [];
    },

    setCurrentCategory(state, category) {
      state.current_category = category;
    },

    RESET_MODULE(state) {
      Object.assign(state, initialState);
    },
  },
};
