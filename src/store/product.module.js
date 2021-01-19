import ProductService from "../services/product.service";
import store from "./index";
const initialState = {
  product_list: [],
  current_product: [],
  category_list: [],
  vousher_list: [],
};
export const productManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get product list-------------------
     */
    getProductList({ commit }) {
      return ProductService.getProductList().then(
        (res) => {
          if (res.status === 200) {
            commit("getProductListSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              commit("initProductList");
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
          commit("initProductList");
        }
      );
    },

    /**
     * ---------get product list demo-------------------
     */
    getProductListDemo({ commit }) {
      return ProductService.getProductListDemo().then(
        (res) => {
          if (res.status === 200) {
            commit("getProductListSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              commit("initProductList");
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
          commit("initProductList");
        }
      );
    },

    
    /**
     * ---------get product list preview-------------------
     */
    getProductListPreview({ commit }) {
      return ProductService.getProductListPreview().then(
        (res) => {
          if (res.status === 200) {
            commit("getProductListSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              commit("initProductList");
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
          commit("initProductList");
        }
      );
    },
    setCurrentProduct({ commit }, product) {
      commit("setCurrentProduct", product);
    },
  },
  getters: {
    twofa_key: (state) => state.twofa_key,
    product_list: (state) => state.product_list,
    current_product: (state) => state.current_product,
    category_list: (state) => state.category_list,
    vousher_list: (state) => state.vousher_list,
  },

  mutations: {
    /**
     * ---------get product List  ----------------
     */
    getProductListSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_color = "primary";
      store.state.notification_icon = "info";
      state.product_list = res.data.data;
      store.state.notification_text =
        "Found: " + state.product_list.length + " Products";
    },

    initProductList(state) {
      state.product_list = [];
      state.category_list = [];
      state.vousher_list = [];
      state.delete_product_id = "";
      state.current_product = [];
      store.state.status = {};
    },

    setCurrentProduct(state, product) {
      state.current_product = product;
    },

    initCategoryList(state) {
      state.category_list = [];
    },

    RESET_MODULE(state) {
      Object.assign(state, initialState);
    },
  },
};
