<template>
  <div
    v-bind:style="{
      'margin-top': product_margin_top,
    }"
  >
    <div
      class="category-banner"
      v-bind:style="{
        'background-image': current_product.customize_hero.background_image,
        'text-align': hero_alignment,
      }"
    >
      <div
        v-bind:style="{
          'padding-top': hero_spacing,
          'padding-bottom': hero_spacing,
          background: current_product.customize_hero.overlay_color,
        }"
      >
        <p
          class="producttitle-category"
          v-bind:style="{ color: current_product.customize_hero.text_color }"
        >
          {{ current_product.title }}
        </p>
        <p
          class="product-description-category"
          v-bind:style="{ color: current_product.customize_hero.text_color }"
        >
          {{ current_product.description }}
        </p>
        <vs-button @click.native="startCourse(current_product)"
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
      >
        <span
          @click="backToMyproducts"
          style="cursor: pointer; user-select: none"
          class="ml-2 primary-font"
          ><i class="ti-angle-left" style="font-size: 14px"></i> My Products </span
        >/
        <span
          @click="backToCurrentProduct"
          style="cursor: pointer; user-select: none"
          class="primary-font"
        >
          {{ current_product.title }}
        </span>
        / {{ current_category.name }}
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
            <vs-card>
              <h3 class="mb-3">{{ current_category.name }}</h3>
              <div
                v-for="(lesson, index) in lesson_list[category_id]"
                v-bind:key="index"
                @click="viewLesson(lesson)"
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
                        'background-image': 'url(' + lesson.thumbnail + ')',
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
                    <h4 class="mb-2">{{ lesson.title }}</h4>
                    <div class="category-description">
                      <span v-html="lesson.body"></span>
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
                    :title="'This lesson is completed.'"
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
            </vs-card>
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
            <vs-card class="progress-thumbnail">
              <div
                class="category-image"
                v-bind:style="{
                  'background-image': 'url(' + current_category.thumbnail + ')',
                }"
              ></div>
              <div class="mx-4 mt-3">
                <h4 class="mt-3" v-if="lesson_list[category_id] != undefined">
                  {{ completed_lesson }} of
                  {{ lesson_list[category_id].length }} Lessons Completed
                </h4>
                <vs-progress :percent="completed_lesson_percent" color="primary"
                  >primary</vs-progress
                >
              </div>
            </vs-card>
            <vs-card>
              <h4 class="mb-3">Instructor</h4>
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
                  <div class="mb-1">
                    John Doe
                    <!-- <strong>{{ current_product.instructor.name }}</strong> -->
                  </div>
                  <div style="color: dodgerblue">Instructor</div>
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
  name: "ViewCategory",
  data: () => ({
    instructor_avatar_url: "",
    completed_lesson: 0,
    completed_lesson_percent: 0,
  }),

  computed: {
    category_id: function () {
      var id = this.$route.params.category_id;
      return id.slice(0, id.length);
    },

    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"];
      },
    },

    current_category: {
      get() {
        let category = [];
        for (let i = 0; i < this.category_list.length; i++) {
          if (this.category_list[i].id == this.category_id) {
            category = this.category_list[i];
          }
        }
        return category;
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

    lesson_list: {
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
        if (this.product_id !== "") {
          if (
            this.current_product.customize_header.show_announcement &&
            this.current_product.customize_header.show_header
          ) {
            return "50px";
          } else return "0px";
        } else return "0px";
      },
    },

    hero_alignment: {
      get() {
        let value = "";
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
  },
  watch: {
    is_fake: function () {
      this.getLessonsForCategoryID(this.category_id);
    },
  },

  created() {
    this.$store.dispatch("setFakeMenu", false);

    this.getLessonsForCategoryID(this.category_id);
  },

  methods: {
    async getLessonsForCategoryID(category_id) {
      this.$vs.loading({ type: "material" });
      if (this.academy_token !== null) {
        await this.$store
          .dispatch("lessonManage/getLessonListPreview", category_id)
          .then(() => {
            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon,
            // });
          });
      } else if (this.is_fake) {
        await this.$store
          .dispatch("lessonManage/getLessonListDemo", category_id)
          .then(() => {
            if (this.lesson_list[category_id] !== undefined) {
              var count = 0;
              var total_lesson = this.lesson_list[category_id].length;
              for (let i = 0; i < total_lesson; i++) {
                if (this.lesson_list[category_id][i].lessons_completed)
                  count = count + 1;
              }
              this.completed_lesson = count;
              this.completed_lesson_percent = (count * 100) / total_lesson;

              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      } else {
        await this.$store
          .dispatch("lessonManage/getLessonList", category_id)
          .then(() => {
            if (this.lesson_list[category_id] !== undefined) {
              var count = 0;
              var total_lesson = this.lesson_list[category_id].length;
              for (let i = 0; i < total_lesson; i++) {
                if (this.lesson_list[category_id][i].lessons_completed)
                  count = count + 1;
              }
              this.completed_lesson = count;
              this.completed_lesson_percent = (count * 100) / total_lesson;

              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      }
      this.$vs.loading.close(this.$refs.loading);
    },

    viewLesson(lesson) {
      this.$store.dispatch(
        "categoryManage/setCurrentCategory",
        this.current_category
      );
      this.$store.dispatch("lessonManage/setCurrentLesson", lesson);
      this.$router.push("/view-lesson/" + lesson.id);
    },
    backToMyproducts() {
      this.$router.push("/library");
    },

    backToCurrentProduct() {
      this.$router.push("/product/" + this.current_product.id);
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
}

.product-image {
  width: 30%;
  background-position: center;
  background-image: url("../../assets/images/big/img3.jpg");
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
  background: white;
}

.category-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}

.start-course {
  position: absolute;
  margin-top: 60px;
}

.progress-thumbnail .vs-card--content {
  padding: 0;
  padding-bottom: 20px;
}

.progress-thumbnail .vs-card--content .category-image {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
@media only screen and (min-width: 400px) {
  .product-card .vs-card--content {
    height: 0;
    padding: 0;
  }

  .product-card {
    position: relative;
  }

  .view-product {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}

@media only screen and (max-width: 900px) {
  .category-responsive {
    flex-direction: column-reverse;
  }
}

@media only screen and (max-width: 400px) {
  .product-image {
    width: 100%;
    background-position: center;
    background-image: url("../../assets/images/big/img3.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    height: 200px;
  }
  .product-card .vs-card--content {
    height: auto;
    padding: 20px;
  }

  .view-product {
    position: relative;
  }
}
</style>
