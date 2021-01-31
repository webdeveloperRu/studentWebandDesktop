<template lang="html">
 <footer class="footer footer--dark footer--left" >
    <div class="container">
      <div class="footer__text-container">
        
        
          <span class="footer__copyright">© 2020 Student App</span>
        
          <!-- <div class="footer__powered-by">
            <a target="_blank" rel="nofollow noopener" href="https://app.videocourse.app/login">Powered by Academy App</a>
          </div> -->
     
      </div>
      <!-- <div class="social-icons social-icons--none social-icons--left mt-3">
        <div class="social-icons__row">
          
            <a class="social-icons__icon" href="https://www.facebook.com/kajabi" kjb-settings-id="sections_footer_settings_social_icon_link_facebook" target="">
            <i class="ti ti-facebook" style="color: white; font-size: 20px"></i>
            </a>

            <a class="social-icons__icon" href="https://www.twitter.com/kajabi" kjb-settings-id="sections_footer_settings_social_icon_link_facebook" target="">
            <i class="ti ti-twitter" style="color: white; font-size: 20px"></i>
            </a>

            <a class="social-icons__icon" href="https://www.instagram.com/kajabi" kjb-settings-id="sections_footer_settings_social_icon_link_facebook" target="">
            <i class="ti ti-instagram" style="color: white; font-size: 20px"></i>
            </a>
          
        </div>
      </div> -->
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",

  data: () => ({}),
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