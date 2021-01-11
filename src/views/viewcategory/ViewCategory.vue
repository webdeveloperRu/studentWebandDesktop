<template>
  <div>
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
                    <div class="category-description" :title="lesson.body">
                      {{ lesson.body }}
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
  name: "ViewCategory",
  data: () => ({
    instructor_avatar_url: "",
    completed_lesson: 0,
    completed_lesson_percent: 0,
  }),

  computed: {
    category_id: function() {
      var id = this.$route.params.id;
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
        list = this.$store.getters["lessonManage/lesson_list"];
        return list;
        // if (list[this.category_id] == undefined) return [];
        // else return list[this.category_id];
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
      this.getLessonsForCategoryID(this.category_id);
    },
  },

  created() {
    this.$store.dispatch("setFakeMenu", false);

    this.getLessonsForCategoryID(this.category_id);
    // let total_lesson = this.lesson_list.length + 1;
    // console.log('lesson list', this.lesson_list)
    //   var count = 0;
    //   console.log('totla lesson', total_lesson)
    //   for (let i = 0 ; i < total_lesson ; i ++) {
    //     if (this.lesson_list[i].lessons_completed)
    //       count = count + 1;
    //   }
    //   console.log('count', count)
    //   this.completed_lesson = count;
  },

  methods: {
    async getLessonsForCategoryID(category_id) {
      this.$vs.loading({ type: "material" });
      if (this.is_fake) {
        await this.$store
          .dispatch("lessonManage/getLessonListDemo", category_id)
          .then(() => {
            var count = 0;
            var total_lesson = this.lesson_list[category_id].length;
            for (let i = 0; i < total_lesson; i++) {
              if (this.lesson_list[category_id][i].lessons_completed)
                count = count + 1;
            }
            this.completed_lesson = count;
            this.completed_lesson_percent = (count * 100) / total_lesson;

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
            var count = 0;
            var total_lesson = this.lesson_list[category_id].length;
            for (let i = 0; i < total_lesson; i++) {
              if (this.lesson_list[category_id][i].lessons_completed)
                count = count + 1;
            }
            this.completed_lesson = count;
            this.completed_lesson_percent = (count * 100) / total_lesson;

            // this.$vs.notify({
            //   color: this.notification_color,
            //   text: this.notification_text,
            //   icon: this.notification_icon,
            // });
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
