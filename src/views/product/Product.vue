<template>
  <div
    v-bind:style="{
      'margin-top': product_margin_top,
    }"
  >
    <div
      class="category-banner"
      v-bind:style="{
        'background-image': convertBackgroundCssImageUrl(hero_background_image),
        'text-align': hero_alignment,
      }"
    >
      <div
        v-bind:style="{
          'padding-top': hero_spacing,
          'padding-bottom': hero_spacing,
          'background-color': hero_overlay_color,
        }"
      >
        <p
          class="producttitle-category"
          v-bind:style="{
            color: hero_text_color,
            'font-family': heading_font_family,
          }"
        >
          {{ current_product.title }}
        </p>
        <p
          class="product-description-category"
          v-bind:style="{
            color: hero_text_color,
            'font-family': base_font_family,
          }"
        >
          {{ current_product.description }}
        </p>
        <vs-button
          class="mt-2"
          @click.native="startCourse(current_product)"
          v-bind:style="{
            'font-family': heading_font_family,
          }"
          >Start Course</vs-button
        >
      </div>
    </div>
    <br />
    <br />
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="9"
        vs-sm="10"
        vs-xs="12"
        class="mb-3"
        code-toggler
        v-bind:style="{
          'font-family': base_font_family,
        }"
      >
        <span
          @click="backToMyproducts"
          style="cursor: pointer; user-select: none"
          class="ml-2 mb-5 mt-2 primary-font"
          ><i class="ti-angle-left" style="font-size: 14px"></i> My Products </span
        >/ {{ current_product.title }}
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="9"
        vs-sm="10"
        vs-xs="12"
        code-toggler
      >
        <vs-row vs-justify="center" class="primary-font category-responsive">
          <vs-col
            type="flex"
            vs-justify="center"
            vs-align="center"
            vs-lg="8"
            vs-sm="12"
            vs-xs="12"
            code-toggler
          >
            <vs-card v-if="show_welcome">
              <div
                v-bind:style="{
                  'text-align': welcome_text_aligment,
                }"
              >
                <p
                  class="product-welcome-title"
                  v-bind:style="{
                    color: dark_font_color,
                    'font-family': heading_font_family,
                  }"
                >
                  {{ current_product.title }}
                </p>
                <p
                  class="product-welcome-description"
                  v-bind:style="{
                    color: dark_font_color,
                    'font-family': base_font_family,
                  }"
                >
                  {{ current_product.description }}
                </p>
              </div>
            </vs-card>
            <div v-if="syllabus_type == 'Posts'">
              <vs-card
                v-for="(category, index_card) in category_list"
                v-bind:key="index_card"
              >
                <h3
                  class="mb-3"
                  style="cursor: pointer"
                  @click="viewCategory(category.id)"
                  v-bind:style="{
                    'font-family': heading_font_family,
                    color: dark_font_color,
                  }"
                >
                  {{ category.name }}
                </h3>
                <div
                  v-for="(lesson, index) in lesson_list[category.id]"
                  v-bind:key="index"
                  style="cursor: pointer"
                  @click="viewLesson(lesson, category)"
                >
                  <vs-row
                    vs-justify="center"
                    vs-align="center"
                    class="category-item mb-4 p-2"
                    v-if="index < 10 || view_more[index_card] === true"
                    v-bind="view_more"
                  >
                    <vs-col
                      type="flex"
                      vs-justify="center"
                      vs-align="center"
                      vs-lg="3"
                      vs-sm="12"
                      vs-xs="12"
                      code-toggler
                    >
                      <div
                        class="category-image"
                        style="cursor: pointer"
                        v-bind:style="{
                          'background-image':
                            'url(' + getLessonThumbnail(lesson.thumbnail) + ')',
                        }"
                      ></div>
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
                      <div style="cursor: pointer">
                        <h4
                          class="mb-2"
                          v-bind:style="{
                            'font-family': base_font_family,
                            color: dark_font_color,
                          }"
                        >
                          {{ lesson.title }}
                        </h4>
                        <div
                          class="category-description"
                          v-bind:style="{
                            'font-family': base_font_family,
                            color: dark_font_color,
                          }"
                        >
                          <span v-html="lesson.body"></span>
                        </div>
                      </div>
                    </vs-col>
                    <vs-col
                      type="flex"
                      vs-justify="center"
                      vs-align="center"
                      vs-lg="1"
                      vs-sm="12"
                      vs-xs="12"
                      code-toggler
                      :title="'This lesson is completed'"
                    >
                      <vs-icon
                        icon="check"
                        color="danger"
                        style="font-size: 20px"
                        v-if="lesson.lessons_completed"
                      ></vs-icon>
                    </vs-col>
                  </vs-row>
                </div>
                <div v-if="lesson_list[category.id] != undefined">
                  <div
                    v-if="
                      lesson_list[category.id].length > 10 &&
                      view_more[index_card] != true
                    "
                    color="danger"
                    @click="viewMore(index_card)"
                    style="cursor: pointer; color: dodgerblue"
                    v-bind:style="{
                      'font-family': base_font_family,
                    }"
                  >
                    {{ show_more_text }}
                  </div>
                </div>
              </vs-card>
            </div>
            <div v-else>
              <vs-card>
                <h3
                  class="mb-3"
                  v-bind:style="{
                    'font-family': heading_font_family,
                    color: dark_font_color,
                  }"
                >
                  {{ categories_text }}
                </h3>
                <div
                  v-for="(category, index) in category_list"
                  v-bind:key="index"
                  @click="viewCategory(category.id)"
                  style="cursor: pointer"
                >
                  <vs-row
                    vs-justify="center"
                    vs-align="center"
                    class="category-item mb-4 p-2"
                  >
                    <vs-col
                      type="flex"
                      vs-justify="center"
                      vs-align="center"
                      vs-lg="3"
                      vs-sm="12"
                      vs-xs="12"
                      code-toggler
                    >
                      <div
                        class="category-image"
                        v-bind:style="{
                          'background-image':
                            'url(' +
                            getCategoryThumbnail(category.thumbnail) +
                            ')',
                        }"
                      ></div>
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
                      <h4 class="mb-2">{{ category.name }}</h4>
                      <div class="category-description">
                        <span
                          v-html="category.description"
                          v-bind:style="{
                            'font-family':
                              current_product.customize_settings
                                .base_font_family,
                            color: dark_font_color,
                          }"
                        ></span>
                      </div>
                    </vs-col>
                  </vs-row>
                </div>
              </vs-card>
            </div>
            <div v-if="category_list.length == 0">
              <vs-card>
                <div class="mt-5 mb-5">
                  <h3>There is no course data in this product...</h3>
                </div>
              </vs-card>
            </div>
          </vs-col>
          <vs-col
            type="flex"
            vs-justify="center"
            vs-align="center"
            vs-lg="4"
            vs-sm="12"
            vs-xs="12"
            code-toggler
          >
            <vs-card class="progress-product_thumbnail">
              <div
                class="category-image"
                v-bind:style="{
                  'background-image': 'url(' + current_product.thumbnail + ')',
                }"
              ></div>
              <div class="mx-4 mt-3">
                <h4
                  class="mt-3"
                  v-bind:style="{
                    'font-family': heading_font_family,
                    color: dark_font_color,
                  }"
                >
                  {{ completed_lesson }} of {{ total_lesson }} Lessons Completed
                </h4>
                <vs-progress
                  :percent="total_completed_lesson_percent"
                  color="primary"
                  >primary</vs-progress
                >
              </div>
            </vs-card>
            <vs-card>
              <h4 class="mb-3">Product Description</h4>

              <div
                class="mt-3"
                v-bind:style="{
                  'font-family': base_font_family,
                  color: dark_font_color,
                }"
              >
                {{ current_product.description }}
              </div>
            </vs-card>
            <vs-card>
              <h4
                class="mb-3"
                v-bind:style="{
                  'font-family': heading_font_family,
                  color: dark_font_color,
                }"
              >
                Instructor
              </h4>
              <div
                class="d-flex"
                style="align-items: center; justify-content: flex-start"
              >
                <!-- <vs-avatar
                  size="70px"
                  :src="current_product.instructor.headshot"
                ></vs-avatar> -->
                <vs-avatar size="70px"></vs-avatar>
                <div class="ml-3">
                  <div
                    class="mb-1"
                    v-bind:style="{
                      'font-family': base_font_family,
                      color: dark_font_color,
                    }"
                  >
                    <!-- <strong>{{ current_product.instructor.name }}</strong> -->
                    <strong>John Doe</strong>
                  </div>
                  <div
                    style="color: dodgerblue"
                    v-bind:style="{
                      'font-family': base_font_family,
                    }"
                  >
                    Instructor
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <!-- {{ current_product.instructor.description }} -->
              </div>
            </vs-card>
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: "Product",
  data: () => ({
    lesson_list: {},
    completed_lesson: 0,
    total_lesson: 0,
    total_completed_lesson_percent: 0,
    view_more: [],
    newLength: 0,
    // instructor_avatar_url: "",
  }),

  computed: {
    product_id: function () {
      var id = this.$route.params.product_id;
      if (id == undefined) return "";
      else return id.slice(0, id.length);
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

    category_list: {
      get() {
        let list = [];
        let category_list = this.$store.getters["productManage/category_list"];
        if (category_list == undefined) return [];
        else {
          let published_count = 0;
          for (let i = 0; i < category_list.length; i++) {
            if (category_list[i].status == "published") {
              list[published_count] = category_list[i];
              published_count++;
            }
          }
          return list;
        }
      },
    },
    lesson_list_store: {
      get() {
        let list = {};
        let lesson_list = {};
        list = this.$store.getters["lessonManage/lesson_list"];
        for (let i = 0; i < this.category_list.length; i++) {
          let lesson_count = 0;
          lesson_list[this.category_list[i].id] = [];
          if (list[this.category_list[i].id] !== undefined) {
            for (let j = 0; j < list[this.category_list[i].id].length; j++) {
              if (list[this.category_list[i].id][j].status == "published") {
                lesson_list[this.category_list[i].id][lesson_count] =
                  list[this.category_list[i].id][j];
                lesson_count++;
              }
            }
          }
        }
        return lesson_list;
      },
    },
    status_got: {
      get() {
        return this.$store.getters["status_got"];
      },
    },
    is_fake: {
      get() {
        return this.$store.getters["is_fake"];
      },
    },

    academy_token: {
      get() {
        return JSON.parse(localStorage.getItem("academy_token"));
      },
    },

    product_margin_top: {
      get() {
        let logo_height_diff = 0;
        if (this.current_product.customize_header == undefined) return "0px";
        if (this.current_product.customize_header.custom_logo_height > 56) {
          logo_height_diff =
            this.current_product.customize_header.custom_logo_height - 56;
        }
        if (this.product_id !== "") {
          if (
            this.current_product.customize_header.show_announcement &&
            this.current_product.customize_header.show_header
          ) {
            logo_height_diff = logo_height_diff + 50;
          } else logo_height_diff = 0;
        } else logo_height_diff = 0;
        return logo_height_diff.toString() + "px";
      },
    },

    hero_alignment: {
      get() {
        let value = "center";
        if (this.current_product.customize_hero == undefined) return value;
        switch (this.current_product.customize_hero.alignment) {
          case "Centered":
            value = "center";
            break;
          case "Left":
            value = "left";
            break;
          case "Right":
            value = "right";
            break;
        }
        return value;
      },
    },
    hero_spacing: {
      get() {
        let value = "";
        if (this.current_product.customize_hero == undefined) return "30px";
        switch (this.current_product.customize_hero.spacing) {
          case "Small":
            value = "30px";
            break;
          case "Medium":
            value = "50px";
            break;
          case "Large":
            value = "100px";
            break;
          case "Extra Small":
            value = "10px";
            break;
        }
        return value;
      },
    },

    welcome_text_aligment: {
      get() {
        let value = "";
        switch (this.current_product.customize_wellcome.text_alignment) {
          case "Centered":
            value = "center";
            break;
          case "Left":
            value = "left";
            break;
          case "Right":
            value = "right";
            break;
        }
        return value;
      },
    },

    hero_overlay_color: {
      get() {
        if (this.current_product.customize_hero == undefined)
          return "#005fcc87";
        if (this.current_product.customize_hero.overlay_color == null) {
          return "#005fcc87";
        } else return this.current_product.customize_hero.overlay_color;
      },
    },

    hero_text_color: {
      get() {
        if (this.current_product.customize_hero == undefined) return "#ffffff";
        if (this.current_product.customize_hero.text_color == null) {
          return "#ffffff";
        } else return this.current_product.customize_hero.text_color;
      },
    },

    hero_background_image: {
      get() {
        if (this.current_product.hero_background_image == "") {
          // return require("@/assets/images/hero-default-banner.png");
          return "";
        } else {
          return this.current_product.hero_background_image;
        }
      },
    },

    dark_font_color: {
      get() {
        if (this.current_product.customize_settings == undefined)
          return "#000000";
        if (this.current_product.customize_settings.dark_font_color == null)
          return "#000000";
        else return this.current_product.customize_settings.dark_font_color;
      },
    },

    message_success_color: {
      get() {
        if (this.current_product.customize_settings == undefined)
          return "#1abc9c";
        if (this.current_product.customize_settings.mc_success == null)
          return "#1abc9c";
        else return this.current_product.customize_settings.mc_success;
      },
    },

    message_info_color: {
      get() {
        if (this.current_product.customize_settings == undefined)
          return "#34495e";
        if (this.current_product.customize_settings.mc_info == null)
          return "#34495e";
        else return this.current_product.customize_settings.mc_info;
      },
    },

    message_danger_color: {
      get() {
        if (this.current_product.customize_settings == undefined)
          return "#e74c3c";
        if (this.current_product.customize_settings.mc_danger == null)
          return "#e74c3c";
        else return this.current_product.customize_settings.mc_danger;
      },
    },

    message_warning_color: {
      get() {
        if (this.current_product.customize_settings == undefined)
          return "#f39c12";
        if (this.current_product.customize_settings.mc_warning == null)
          return "#f39c12";
        else return this.current_product.customize_settings.mc_warning;
      },
    },

    heading_font_family: {
      get() {
        if (this.current_product.customize_settings == undefined) return "";
        else return this.current_product.customize_settings.heading_font_family;
      },
    },

    base_font_family: {
      get() {
        if (this.current_product.customize_settings == undefined) return "";
        else return this.current_product.customize_settings.base_font_family;
      },
    },

    show_welcome: {
      get() {
        if (this.current_product.customize_wellcome == undefined) return false;
        else if (this.current_product.customize_wellcome.show_welcome)
          return true;
        else return false;
      },
    },

    syllabus_type: {
      get() {
        if (this.current_product.customize_syllabus == undefined)
          return "Posts";
        else return this.current_product.customize_syllabus.syllabus_type;
      },
    },

    show_more_text: {
      get() {
        if (this.current_product.customize_syllabus == undefined)
          return "show more";
        else return this.current_product.customize_syllabus.show_more_text;
      },
    },

    categories_text: {
      get() {
        if (this.current_product.customize_syllabus == undefined)
          return "categories";
        else return this.current_product.customize_syllabus.categories_text;
      },
    },
  },
  watch: {
    is_fake: function () {
      this.getCategoriesForProductID(this.product_id);
    },
  },
  created() {
    this.$store.dispatch("setFakeMenu", false);
    this.getCategoriesForProductID(this.product_id);
  },

  methods: {
    convertBackgroundCssImageUrl(url) {
      return "url(" + url + ")";
    },
    /**
     * --------------get ProductList-------------
     */
    async getProductList() {
      if (this.academy_token !== null) {
        await this.$store
          .dispatch("productManage/getProductListPreview")
          .then(() => {});
      } else if (this.is_fake) {
        await this.$store
          .dispatch("productManage/getProductListDemo")
          .then(() => {});
      } else {
        await this.$store
          .dispatch("productManage/getProductList")
          .then(() => {});
      }
    },
    async loadingLessons() {
      if (this.category_list != undefined && this.category_list.length !== 0) {
        this.$vs.loading({ type: "material" });
        if (this.category_list != undefined) {
          var total_category_num = this.category_list.length;
          for (let i = 0; i < total_category_num; i++) {
            this.view_more[i] = false;
            await this.getLessonsForCategoryID(this.category_list[i].id);
          }
        }
        this.$vs.loading.close();
      }
      this.lesson_list = this.lesson_list_store;
      var total_lesson_num = 0;
      var completed_lesson_num = 0;
      for (let i = 0; i < total_category_num; i++) {
        for (
          let j = 0;
          j < this.lesson_list[this.category_list[i].id].length;
          j++
        ) {
          total_lesson_num = total_lesson_num + 1;
          if (
            this.lesson_list[this.category_list[i].id][j].lessons_completed ==
            true
          )
            completed_lesson_num = completed_lesson_num + 1;
        }
      }
      this.completed_lesson = completed_lesson_num;
      this.total_lesson = total_lesson_num;
      this.total_completed_lesson_percent =
        (completed_lesson_num * 100) / total_lesson_num;
      this.newLength = total_category_num;
    },
    async getCategoriesForProductID(product_id) {
      this.showCategory = false;
      if (this.academy_token !== null) {
        await this.$store
          .dispatch("categoryManage/getCategoryByProductIDPreview", product_id)
          .then(() => {
            if (this.status_got) this.loadingLessons();
            else {
              this.$vs.notify({
                color: this.message_danger_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      } else if (this.is_fake) {
        await this.$store
          .dispatch("categoryManage/getCategoryByProductIDDemo", product_id)
          .then(() => {
            if (this.status_got) this.loadingLessons();
            else {
              this.$vs.notify({
                color: this.message_danger_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      } else {
        await this.$store
          .dispatch("categoryManage/getCategoryByProductID", product_id)
          .then(() => {
            if (this.status_got) this.loadingLessons();
            else {
              this.$vs.notify({
                color: this.message_danger_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      }
    },

    async getLessonsForCategoryID(category_id) {
      if (this.academy_token !== null) {
        await this.$store
          .dispatch("lessonManage/getLessonListPreview", category_id)
          .then(() => {});
      } else if (this.is_fake) {
        await this.$store
          .dispatch("lessonManage/getLessonListDemo", category_id)
          .then(() => {});
      } else {
        await this.$store
          .dispatch("lessonManage/getLessonList", category_id)
          .then(() => {
            if (!this.status_got) {
              this.$vs.notify({
                color: this.message_danger_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      }
    },

    viewMore(index) {
      this.view_more[index] = true;
      this.view_more.splice(this.newLength);
    },

    viewLesson(lesson, category) {
      this.$store.dispatch(
        "productManage/setCurrentProduct",
        this.current_product
      );
      this.$store.dispatch("categoryManage/setCurrentCategory", category);
      this.$store.dispatch("lessonManage/setCurrentLesson", lesson);
      this.$router.push("/view-lesson/" + lesson.id);
    },

    viewCategory(category_id) {
      this.$store.dispatch(
        "productManage/setCurrentProduct",
        this.current_product
      );
      this.$router.push("/view-category/" + category_id);
    },

    backToMyproducts() {
      this.$router.push("/library");
    },

    startCourse(current_product) {
      this.$store.dispatch("productManage/setCurrentProduct", current_product);

      this.$store.dispatch(
        "categoryManage/setCurrentCategory",
        this.category_list[0]
      );
      this.$store.dispatch(
        "lessonManage/setCurrentLesson",
        this.lesson_list[this.category_list[0].id][0]
      );

      this.$router.push(
        "/view-lesson/" + this.lesson_list[this.category_list[0].id][0].id
      );
    },

    getCategoryThumbnail(url) {
      if (url == "" || url == null) {
        return require("@/assets/images/default-product.png");
      } else {
        return url;
      }
    },

    getLessonThumbnail(url) {
      if (url == "" || url == null) {
        return require("@/assets/images/default-product.png");
      } else {
        return url;
      }
    },
  },
};
</script>
<style>
.category-banner {
  margin: 0 -20px;
  margin-top: -24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  align-items: center;
  justify-content: center;
}
.producttitle-category {
  color: white;
  font-size: 50px;
  font-weight: 600;
}
.product-description-category {
  font-size: 16px;
  font-weight: 500;
  margin: 0 100px;
}

.product-image {
  width: 30%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 170px;
}
.category-image {
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  /* background-image: url("../../assets/images/big/img4.jpg"); */
}
.category-item .category-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
  --max-lines: 3;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
  padding-right: 1rem;
}

.category-item .category-description::before {
  position: absolute;
  content: "";
  inset-block-end: 0; /* "bottom" */
  inset-inline-end: 0;
}
.category-item .category-description::after {
  content: "";
  position: absolute;
  inset-inline-end: 0; /* "right" */
  width: 1rem;
  height: 1rem;
  background: transparent;
}
.category-item:hover .category-description::after {
  background-color: transparent;
}
.category-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}

.progress-product_thumbnail .vs-card--content {
  padding: 0;
  padding-bottom: 20px;
}

.progress-product_thumbnail .vs-card--content .category-image {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.product-welcome-title {
  font-size: 40px;
  font-weight: 600;
}

/* @media only screen and (min-width: 400px) {
  .product-card .vs-card--content {
    height: 0;
    padding: 0;
  }
  .product-card .producttitle {
    position: absolute;
    left: 32%;
    top: 40%;
    font-size: 20px;
    font-weight: 700;
  }
  .product-card {
    position: relative;
  }

  .view-product {
    position: absolute;
    right: 20px;
    top: 20px;
  }
} */

@media only screen and (max-width: 900px) {
  .category-responsive {
    flex-direction: column-reverse;
  }
}

@media only screen and (max-width: 400px) {
  .product-image {
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
  }
  .product-card .vs-card--content {
    height: auto;
    padding: 20px;
  }
  .product-card .producttitle {
    position: relative;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .view-product {
    position: relative;
  }
  .category-banner .producttitle-category {
    font-size: 45px;
    color: white;
    margin-top: -40px;
  }
}
</style>
