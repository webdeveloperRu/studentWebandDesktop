import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // ======================
    // Blank Layout
    // ======================
    {
      path: "",
      component: () => import("./layout/blank/Blank.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/login",
          name: "Login",
          index: 1.1,
          component: () => import("./views/authentication/Login.vue"),
        },
        {
          path: "/error404",
          name: "Error 404",
          index: 1.2,
          component: () => import("./views/authentication/Error404.vue"),
        },
        {
          path: "/register",
          name: "Register",
          index: 1.3,
          component: () => import("./views/authentication/Register.vue"),
        },
        {
          path: "/resetpassword",
          name: "ResetPassword",
          index: 1.4,
          component: () => import("./views/authentication/ResetPassword.vue"),
        },
        {
          path: "/changepassword",
          name: "ChangePassword",
          index: 1.5,
          component: () => import("./views/authentication/ChangePassword.vue"),
        },
        {
          path: "/forgotpassword",
          name: "ForgotPassword",
          index: 1.6,
          component: () => import("./views/authentication/ForgotPassword.vue"),
        },
        {
          path: "/twofactorauth",
          name: "Two Factor Auth",
          index: 1.7,
          i18n: "Two Factor Auth",
          component: () => import("./views/authentication/TwoFactorAuth.vue"),
        },
        {
          path: "/twofactorauthsetup",
          name: "Two Factor Auth Setup",
          index: 1.8,
          i18n: "Two Factor Auth Setup",
          component: () =>
            import("./views/authentication/TwoFactorAuthSetup.vue"),
        },
      ],
    },
    {
      // ======================
      // Full Layout
      // ======================
      path: "",
      component: () => import("./layout/full/MainContainer.vue"),
      // ======================
      // Theme routes / pages
      // ======================
      children: [
        {
          path: "/library",
          name: "MyProducts",
          index: 3,
          i18n: "MyProducts",
          component: () => import("./views/myproducts/MyProducts.vue"),
        },
        {
          path: "/product/:product_id",
          name: "Product",
          index: 4,
          i18n: "Product",
          component: () => import("./views/product/Product.vue"),
        },
        {
          path: "/search/:query",
          name: "Search",
          index: 5,
          i18n: "Search",
          component: () => import("./views/search/Search.vue"),
        },
        {
          path: "/settings",
          name: "Settings",
          index: 6,
          i18n: "Settings",
          component: () => import("./views/settings/Settings.vue"),
        },
        {
          path: "/view-category/:category_id",
          name: "ViewCategory",
          index: 7,
          i18n: "Starterkit",
          component: () => import("./views/viewcategory/ViewCategory.vue"),
        },
        {
          path: "/view-lesson/:lesson_id",
          name: "ViewLesson",
          index: 8,
          i18n: "Starterkit",
          component: () => import("./views/viewlesson/ViewLesson.vue"),
        },
      ],
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/Error404",
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
export default router;
