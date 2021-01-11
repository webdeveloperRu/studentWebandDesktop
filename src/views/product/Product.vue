<template>
  <div>
    <div class="category-banner">
      <p class="producttitle-category">{{ current_product.title }}</p>
      <vs-button class="start-course" @click="startCourse(current_product)"
        >Start Course</vs-button
      >
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
            <vs-card
              v-for="(category, index_card) in category_list"
              v-bind:key="index_card"
            >
              <h3
                class="mb-3"
                style="cursor: pointer"
                @click="viewCategory(category.id)"
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
                    <div style="cursor: pointer">
                      <h4 class="mb-2">{{ lesson.title }}</h4>
                      <div class="category-description" :title="lesson.body">
                        {{ lesson.body }}
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
                >
                  View More
                </div>
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
            <vs-card class="progress-product_thumbnail">
              <div
                class="category-image"
                v-bind:style="{
                  'background-image': 'url(' + current_product.thumbnail + ')',
                }"
              ></div>
              <div class="mx-4 mt-3">
                <h4 class="mt-3">
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

              <div class="mt-3">
                {{ current_product.description }}
              </div>
            </vs-card>
            <vs-card>
              <h4 class="mb-3">Instructor</h4>
              <div
                class="d-flex"
                style="align-items: center; justify-content: flex-start"
              >
                <vs-avatar
                  size="70px"
                  :src="current_product.instructor.headshot"
                ></vs-avatar>
                <div class="ml-3">
                  <div class="mb-1">
                    <strong>{{ current_product.instructor.name }}</strong>
                  </div>
                  <div style="color: dodgerblue">Instructor</div>
                </div>
              </div>
              <div class="mt-3">
                {{ current_product.instructor.description }}
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
    product_id: function() {
      var id = this.$route.params.id;
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
        let product = [];
        for (let i = 0; i < this.product_list.length; i++) {
          if (this.product_list[i].id == this.product_id) {
            product = this.product_list[i];
          }
        }
        return product;
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
        list = this.$store.getters["productManage/category_list"];
        if (list == undefined) return [];
        else return list;
      },
    },
    lesson_list_store: {
      get() {
        let list = {};
        list = this.$store.getters["lessonManage/lesson_list"];
        return list;
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
  },
  watch: {
    is_fake: function(newValue, oldValue) {
      this.getCategoriesForProductID(this.product_id);
    },
  },
  created() {
    this.$store.dispatch("setFakeMenu", false);
    this.getCategoriesForProductID(this.product_id);
  },

  methods: {
    async loadingLessons() {
      this.$vs.loading({ type: "material" });
      if (this.category_list != undefined) {
        var total_category_num = this.category_list.length;
        for (let i = 0; i < total_category_num; i++) {
          this.view_more[i] = false;
          await this.getLessonsForCategoryID(this.category_list[i].id);
        }
      }
      this.$vs.loading.close(this.$refs.loading);
      this.lesson_list = this.lesson_list_store;
      var total_lesson_num = 0;
      var completed_lesson_num = 0;
      for (let i = 0; i < total_category_num; i++) {
        // console.log('id', this.lesson_list[this.category_list[i].id])
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
      if (this.is_fake) {
        await this.$store
          .dispatch("categoryManage/getCategoryByProductIDDemo", product_id)
          .then(() => {
            if (this.status_got) this.loadingLessons();
            else {
              this.$vs.notify({
                color: this.notification_color,
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
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      }
    },

    async getLessonsForCategoryID(category_id) {
      if (this.is_fake) {
        await this.$store
          .dispatch("lessonManage/getLessonListDemo", category_id)
          .then(() => {
            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon,
            // });
          });
      } else {
        await this.$store
          .dispatch("lessonManage/getLessonList", category_id)
          .then(() => {
            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon,
            // });
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

      // this.getCategoriesForProductID(current_product.id)
      // .then(() => {
      //    this.$store.dispatch(
      //       "categoryManage/setCurrentCategory",
      //       this.category_list[0]
      //     );
      //     this.getLessonsForCategoryID(this.category_list[0].id)
      //     .then(() => {
      //       this.$store.dispatch(
      //         "lessonManage/setCurrentLesson",
      //         this.lesson_list[this.category_list[0].id][0]
      //       );
      //        this.$router.push("/view-lesson/" + this.lesson_list[this.category_list[0].id][0].id);
      //     });
      //   });
    },
  },
};
</script>
<style>
.category-banner {
  margin: 0 -20px;
  margin-top: -24px;
  background-position: center;
  background-image: url("../../assets/images/big/img1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.producttitle-category {
  color: white;
  font-size: 60px;
  font-weight: 600;
  margin-top: -80px;
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
  background: transparent;
}
.category-item:hover .category-description::after {
  background-color: transparent;
}
.category-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
.start-course {
  position: absolute;
  margin-top: 60px;
}

.progress-product_thumbnail .vs-card--content {
  padding: 0;
  padding-bottom: 20px;
}

.progress-product_thumbnail .vs-card--content .category-image {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
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
    background-image: url("../../assets/images/big/img3.jpg");
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
