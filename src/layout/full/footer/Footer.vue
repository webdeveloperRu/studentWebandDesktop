<template lang="html">
  <footer
    class="footer footer--dark footer--left"
    v-bind:style="[current_product.customize_footer?{
      background: current_product.customize_footer.background_color,
    } : '']"
  >
    <div class="container" v-if="current_product.customize_footer">
      <div class="footer__text-container" >
        <span
          v-if="current_product.customize_footer.show_copyright"
          class="footer__copyright"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.text_color,
          }:'']"
          >{{ current_product.customize_footer.copyright_text }}</span
        >
      </div>
      <div
        class="footer-icon-layout d-flex"
        v-if="current_product.customize_footer.show_social_icons"
        v-bind:style="[current_product.customize_footer?{
          'justify-content': social_icon_alignment,
        }: '']"
      >
        <div
          v-if="current_product.customize_footer.sil_facebook != ''"
          class="footer-icon"
          :title="current_product.customize_footer.sil_facebook"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-facebook"
            @click="linkToSocial(current_product.customize_footer.sil_facebook)"
          ></i>
        </div>
        <div
          v-if="current_product.customize_footer.sil_twitter != ''"
          class="footer-icon"
          :title="current_product.customize_footer.sil_twitter"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="mdi mdi-twitter"
            @click="linkToSocial(current_product.customize_footer.sil_twitter)"
          ></i>
        </div>
        <div
          v-if="current_product.customize_footer.sil_instagram != ''"
          class="footer-icon"
          :title="current_product.customize_footer.sil_instagram"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-instagram"
            @click="
              linkToSocial(current_product.customize_footer.sil_instagram)
            "
          ></i>
        </div>
        <div
          v-if="current_product.customize_footer.sil_youtube != ''"
          class="footer-icon"
          :title="current_product.customize_footer.sil_youtube"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-youtube"
            @click="linkToSocial(current_product.customize_footer.sil_youtube)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_vimeo"
          v-if="current_product.customize_footer.sil_vimeo != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-vimeo"
            @click="linkToSocial(current_product.customize_footer.sil_vimeo)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_github"
          v-if="current_product.customize_footer.sil_github != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-github"
            @click="linkToSocial(current_product.customize_footer.sil_github)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_itunes"
          v-if="current_product.customize_footer.sil_itunes != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="mdi mdi-itunes"
            @click="linkToSocial(current_product.customize_footer.sil_itunes)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_linkedin"
          v-if="current_product.customize_footer.sil_linkedin != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-linkedin"
            @click="linkToSocial(current_product.customize_footer.sil_linkedin)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_soundcloud"
          v-if="current_product.customize_footer.sil_soundcloud != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="mdi mdi-soundcloud"
            @click="
              linkToSocial(current_product.customize_footer.sil_soundcloud)
            "
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_tumblr"
          v-if="current_product.customize_footer.sil_tumblr != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-tumblr"
            @click="linkToSocial(current_product.customize_footer.sil_tumblr)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_flickr"
          v-if="current_product.customize_footer.sil_flickr != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-flickr"
            @click="linkToSocial(current_product.customize_footer.sil_flickr)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_slack"
          v-if="current_product.customize_footer.sil_slack != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }: '']"
        >
          <i
            class="mdi mdi-slack"
            @click="linkToSocial(current_product.customize_footer.sil_slack)"
          ></i>
        </div>
        <div
          :title="current_product.customize_footer.sil_dribbble"
          v-if="current_product.customize_footer.sil_dribbble != ''"
          class="footer-icon"
          v-bind:style="[current_product.customize_footer?{
            color: current_product.customize_footer.social_icon_color,
            background: social_icon_background_color,
            'border-radius': social_icon_border_radius,
          }:'']"
        >
          <i
            class="ti-dribbble"
            @click="linkToSocial(current_product.customize_footer.sil_dribbble)"
          ></i>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    footer_logo: {
      type: String,
    },
  },

  data: () => ({}),

  computed: {
    product_id: function () {
      var id = this.$route.params.product_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    category_id: function () {
      var id = this.$route.params.category_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    lesson_id: function () {
      var id = this.$route.params.lesson_id;
      if (id !== undefined) return id.slice(0, id.length);
      else return "";
    },
    show_product_footer: {
      get() {
        if (
          this.product_id !== "" ||
          this.category_id !== "" ||
          this.lesson_id !== ""
        ) {
          return true;
        } else return false;
      },
    },

    product_list: {
      get() {
        return this.$store.getters["productManage/product_list"];
      },
    },

    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"];
      },
    },
    social_icon_border_radius: {
      get() {
        if (this.current_product.customize_footer.social_icon_style != "Round")
          return "0px";
        else return "18px";
      },
    },
    social_icon_background_color: {
      get() {
        if (this.current_product.customize_footer.social_icon_style != "None")
          return this.current_product.customize_footer
            .social_icon_background_color;
        else return "none";
      },
    },

    social_icon_alignment: {
      get() {
        let value = "";
        switch (this.current_product.customize_footer.social_icon_alignment) {
          case "Left":
            value = "flex-start";
            break;
          case "Center":
            value = "center";
            break;

          case "Right":
            value = "flex-end";
            break;
        }
        return value;
      },
    },
  },
  methods: {
    linkToSocial(url) {
      if (this.current_product.customize_footer.links_in_new_window)
        window.open(url, "_blank");
      else window.open(url, "_self");
    },
  },
};
</script>

<style>
.footer {
  background: #272d34;
  padding: 15px 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;
}
.footer--dark {
  color: #fff;
}
.footer__text-container {
  overflow: hidden;
  text-align: center;
}
.footer__copyright {
  line-height: 40px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: inline-block;
}
.footer__menu,
.footer__powered-by {
  display: inline-block;
  float: right;
}
.footer--dark a {
  color: #fff;
}
.footer__menu-item,
.footer__powered-by a {
  line-height: 40px;
  display: inline-block;
  margin-left: 20px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.social-icons--left {
  text-align: left;
}
.social-icons {
  font-size: 0;
  display: block;
  margin-bottom: 30px;
  text-align: left;
}
.social-icons__row {
  margin: -10px;
}
.footer .social-icons__icon,
.footer .social-icons__icon:hover {
  color: #ffffff;
}
.social-icons__icon {
  font-family: "FontAwesome" !important;
  font-size: 24px;
  line-height: 40px;
  display: inline-block;
  margin: 10px;
  text-decoration: none;
}
.footer-icon {
  font-size: 22px;
  margin: 0px 5px 0px 5px;
  align-items: center;
  justify-content: center;
  width: 36px;
  display: flex;
  height: 36px;
  cursor: pointer;
}
@media (max-width: 767px) {
  .footer {
    text-align: center;
  }
  .footer__copyright {
    line-height: 30px;
    display: block;
    float: none;
  }
  .footer__menu,
  .footer__powered-by {
    display: block;
    float: none;
  }
  .footer__menu-item,
  .footer__powered-by a {
    line-height: 30px;
    display: block;
    margin-right: 0;
    margin-left: 0;
  }
  .footer__menu,
  .footer__powered-by {
    display: block;
    float: none;
  }
  .social-icons--left,
  .social-icons--right {
    text-align: center;
  }
}
</style>
