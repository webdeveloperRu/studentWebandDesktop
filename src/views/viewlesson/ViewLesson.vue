<template>
  <div>
    <vs-row vs-justify="center" class="primary-font">
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="9"
        vs-sm="9"
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
          class="ml-2 primary-font"
        >
          {{ current_product.title }}
        </span>
        /
        <span
          @click="backToCurrentCategory"
          style="cursor: pointer; user-select: none"
          class="ml-2 primary-font"
        >
          {{ current_category.name }}
        </span>
        / {{ current_lesson.title }}
      </vs-col>
      <vs-col
        type="flex"
        vs-justify="center"
        vs-align="center"
        vs-lg="9"
        vs-sm="9"
        vs-xs="12"
        code-toggler
      >
        <vs-row vs-justify="center" class="primary-font">
          <vs-col
            type="flex"
            vs-justify="center"
            vs-align="center"
            vs-xs="12"
            code-toggler
          >
            <vs-card class="lesson-overview bg-dark">
              <vs-row
                vs-justify="center"
                vs-align="center"
                class="primary-font"
              >
                <vs-col
                  type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-lg="8"
                  vs-sm="12"
                  vs-xs="12"
                  code-toggler
                >
                  <!-- <div class="lesson-image"> -->
                  <video
                    class="lesson-video"
                    width=""
                    height=""
                    controls
                    controlsList="nodownload"
                  >
                    <source
                      src="https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4"
                      type="video/ogg"
                    />
                    Your browser does not support the video tag.
                  </video>
                  <!-- </div> -->
                </vs-col>
                <vs-col
                  type="flex"
                  vs-justify="center"
                  vs-align="center"
                  vs-lg="4"
                  vs-sm="12"
                  vs-xs="12"
                  code-toggler
                  style="color: white"
                >
                  <div class="lesson-list my-2">
                    <h4 class="mb-1">{{ current_category.name }}</h4>
                    <div
                      v-if="
                        lesson_list[current_category.id].length != undefined
                      "
                      class="mb-1"
                    >
                      {{ lesson_list[current_category.id].length }} Lessons
                    </div>
                  </div>
                  <div
                    style="
                      max-height: 280px;
                      overflow-y: auto;
                      overflow-x: hidden;
                    "
                  >
                    <div
                      v-for="(lesson, index) in lesson_list[
                        current_category.id
                      ]"
                      v-bind:key="index"
                      @click="clickLessonItem(lesson)"
                    >
                      <vs-row
                        vs-justify="center"
                        vs-align="center"
                        class="primary-font my-2 lesson-item p-2"
                        style="cursor: pointer"
                        v-bind:class="{
                          lessonitemactive: lesson.id == current_lesson.id,
                        }"
                      >
                        <vs-col
                          type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-lg="1"
                          code-toggler
                        >
                          <div>
                            {{ index + 1 }}
                          </div>
                        </vs-col>
                        <vs-col
                          type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-lg="4"
                          code-toggler
                        >
                          <div
                            class="lesson-image"
                            v-bind:style="{
                              'background-image':
                                'url(' + lesson.thumbnail + ')',
                            }"
                          ></div>
                        </vs-col>
                        <vs-col
                          type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-lg="5"
                          code-toggler
                          class="lesson-name"
                          :title="lesson.title"
                        >
                          {{ lesson.title }}
                        </vs-col>
                        <vs-col
                          type="flex"
                          vs-justify="center"
                          vs-align="center"
                          vs-lg="1"
                          code-toggler
                        >
                          <div>
                            <vs-icon
                              icon="check"
                              color="success"
                              style="font-size: 20px"
                              v-if="lesson.lessons_completed"
                            ></vs-icon>
                          </div>
                        </vs-col>
                      </vs-row>
                    </div>
                  </div>
                  <div class="text-center">
                    <vs-button
                      v-if="prev_button"
                      color="dark"
                      type="filled"
                      size="small"
                      @click="prevCategory"
                      >Previous Category</vs-button
                    >
                    <vs-button
                      v-if="next_button"
                      color="dark"
                      type="filled"
                      size="small"
                      @click="nextCategory"
                      >Next Category</vs-button
                    >
                  </div>
                </vs-col>
              </vs-row>
            </vs-card>
          </vs-col>
        </vs-row>
        <vs-row class="primary-font">
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
              <div
                v-if="current_lesson.lessons_completed"
                style="background-color: #2962FF; color: white;"
                class="mark-as-complete mb-3 w-100 p-2"
                @click="markAsComplete(false)"
              >
                Complete
              </div>
              <div
                v-else
                class="mark-as-complete mb-3 w-100 p-2"
                @click="markAsComplete(true)"
              >
                Mark As Complete
              </div>
              <vs-row
                v-if="
                  current_lesson.lessons_completed &&
                    endlesson &&
                    show_congratulation
                "
                class="p-2 mb-3"
                style="background-color: #f6f6f6; margin: 0 auto;"
                vs-align="center"
                vs-justify="center"
              >
                <vs-col vs-lg="3" vs-sm="12">
                  <div
                    class="lesson-image"
                    v-bind:style="{
                      'background-image':
                        'url(' + current_lesson.thumbnail + ')',
                    }"
                  ></div>
                </vs-col>
                <vs-col
                  vs-lg="6"
                  vs-sm="12"
                  vs-align="center"
                  vs-justify="center"
                  style="text-align: center"
                >
                  <div>Great Job! Keep Going!</div>
                  <div>
                    <strong>{{ current_lesson.title }}</strong>
                  </div>
                </vs-col>
                <vs-col
                  vs-lg="3"
                  vs-sm="12"
                  vs-align="center"
                  vs-justify="center"
                  style="color: dodgerblue;cursor: pointer; font-size: 12px"
                >
                  <div @click="nextLesson" style="text-align: center">
                    Next Lesson
                    <vs-icon
                      icon="chevron_right"
                      style="font-size: 15px"
                    ></vs-icon>
                  </div>
                </vs-col>
              </vs-row>

              <h2 class="mb-3">{{ current_lesson.title }}</h2>
              <h4
                class="mb-3"
                style="color: dodgerblue; cursor: pointer"
                @click="backToCurrentCategory"
              >
                {{ current_category.name }}
              </h4>
              <p class="lesson-name">
                {{ current_lesson.body }}
              </p>
            </vs-card>
            <vs-card>
              <div style="display: flex">
                <h3 class="mb-3">Comments</h3>
                <h3 class="ml-3 mb-3 text-muted">{{ comment_list.length }}</h3>
              </div>
              <vs-textarea
                placeholder="Say Something here..."
                v-model="comment"
                class="w-100 mt-3"
              />
              <vs-button class="mt-3" @click="postComment"
                >Post Comment</vs-button
              >
              <vs-divider></vs-divider>
              <div
                v-for="(comment, index) in comment_list"
                v-bind:key="index"
                class="mb-2"
              >
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                  class="mt-0"
                >
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    "
                  >
                    <vs-avatar size="40px"></vs-avatar>
                    <div>{{ comment.author_name }}</div>
                  </div>
                  <div>
                    {{ timeDifference(Date.now(), comment.created_on) }}
                  </div>
                </div>
                <p>{{ comment.comment }}</p>
                <vs-button size="small" type="flat">REPLY</vs-button>
                <vs-button size="small" type="flat">EDIT</vs-button>
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
            <vs-card>
              <h4 class="mb-3">Downloads</h4>
              <div
                v-for="(filesrc, index) in filesrcs"
                :key="index"
                class="d-flex mt-2"
                style="align-items: center; justify-content: flex-start"
              >
                <vs-icon
                  icon="insert_drive_file"
                  color="gray"
                  style="font-size: 20px"
                ></vs-icon>
                <div class="ml-3">
                  <div style="color: dodgerblue">
                    <a
                      v-text="filesrc.title"
                      @click="downloadWithAxios(filesrc.src, filesrc.title)"
                    />
                  </div>
                </div>
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
import Axios from "axios";
export default {
  name: "ViewLesson",
  data: () => ({
    comment: "",
    prev_button: true,
    next_button: true,
    endlesson: true,
    instructor_avatar_url: "",
    show_congratulation: false,
    // item: {
    //   url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    //   label: 'samplePDF',
    // },
    filesrcs: [
      {
        title: "AadharCard.png",
        src: require("@/assets/images/big/img1.jpg"),
      },
      {
        title: "PANCard.png",
        src: require("@/assets/images/big/img2.jpg"),
      },
      {
        title: "Licence.png",
        src: require("@/assets/images/big/img3.jpg"),
      },
      {
        title: "Photo.png",
        src: require("@/assets/images/big/img4.jpg"),
      },
      {
        title: "Photo.pdf",
        src:
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ],
  }),

  computed: {
    lesson_id: function() {
      var id = this.$route.params.id;
      return id.slice(0, id.length);
    },

    // current_lesson: {
    //   get() {
    //     let lesson = [];
    //     for (let i = 0; i < this.lesson_list.length; i++) {
    //       if (this.lesson_list[i].id == this.lesson_id) {
    //         lesson = this.lesson_list[i];
    //       }
    //     }
    //     return lesson;
    //   },
    // },

    current_lesson: {
      get() {
        return this.$store.getters["lessonManage/current_lesson"];
      },
    },

    current_product: {
      get() {
        return this.$store.getters["productManage/current_product"];
      },
    },

    current_category: {
      get() {
        return this.$store.getters["categoryManage/current_category"];
      },
    },

    category_list: {
      get() {
        return this.$store.getters["productManage/category_list"];
      },
    },

    lesson_list: {
      get() {
        let list = {};
        list = this.$store.getters["lessonManage/lesson_list"];
        return list;
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

    comment_list: {
      get() {
        let list = [];
        list = this.$store.getters["commentManage/comment_list"];
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

  created() {
    this.$store.dispatch("setFakeMenu", false);
    this.getCommentsForLessonID(this.lesson_id);
    if (this.current_category.sort_position == 0) this.prev_button = false;
    if (this.current_category.sort_position == this.category_list.length - 1)
      this.next_button = false;

    if (
      this.current_lesson.sort_position >
      this.lesson_list[this.current_category.id].length - 2
    ) {
      this.endlesson = false;
    } else {
      this.endlesson = true;
    }
  },
  // watch: {
  //   is_fake: function(newValue, oldValue) {
  //     this.getProductList();
  //   },
  // },

  methods: {
    async getCommentsForLessonID(lesson_id) {
      this.$vs.loading({
        type: "material",
      });
      if (this.is_fake) {
        await this.$store
          .dispatch("commentManage/getCommentList", lesson_id)
          .then(() => {
            if (!this.status_got) {
              this.$vs.notify({
                color: this.notification_color,
                text: this.notification_text,
                icon: this.notification_icon,
              });
            }
          });
      } else {
        await this.$store
          .dispatch("commentManage/getCommentListDemo", lesson_id)
          .then(() => {
            if (!this.status_got) {
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

    async getLessonsForCategoryID(category_id) {
      this.$vs.loading({
        type: "material",
      });

      if (this.is_fake) {
        await this.$store
          .dispatch("lessonManage/getLessonListDemo", category_id)
          .then(() => {
            this.$vs.notify({
              color: this.notification_color,
              text: this.notification_text,
              icon: this.notification_icon,
            });
          });
      } else {
        await this.$store
          .dispatch("lessonManage/getLessonList", category_id)
          .then(() => {
            if (!this.status_got) {
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

    backToMyproducts() {
      this.$router.push("/library");
    },

    backToCurrentProduct() {
      this.$router.push("/product/" + this.current_product.id);
    },

    backToCurrentCategory() {
      this.$router.push("/view-category/" + this.current_category.id);
    },

    clickLessonItem(current_lesson) {
      this.$store.dispatch("lessonManage/setCurrentLesson", current_lesson);
      this.getCommentsForLessonID(current_lesson.id);
      if (
        this.current_lesson.sort_position >
        this.lesson_list[this.current_category.id].length - 2
      ) {
        this.endlesson = false;
      } else {
        this.endlesson = true;
      }
    },

    prevCategory() {
      this.$store.dispatch(
        "categoryManage/setCurrentCategory",
        this.category_list[this.current_category.sort_position - 1]
      );

      // this.getLessonsForCategoryID(this.current_category.id);

      this.$store.dispatch(
        "lessonManage/setCurrentLesson",
        this.lesson_list[this.current_category.id][0]
      );

      this.getCommentsForLessonID(this.current_lesson.id);
      if (this.current_category.sort_position == 0) this.prev_button = false;
      else this.prev_button = true;

      if (this.current_category.sort_position == this.category_list.length - 1)
        this.next_button = false;
      else this.next_button = true;
    },

    nextCategory() {
      this.$store.dispatch(
        "categoryManage/setCurrentCategory",
        this.category_list[this.current_category.sort_position + 1]
      );

      // this.getLessonsForCategoryID(this.current_category.id);

      this.$store.dispatch(
        "lessonManage/setCurrentLesson",
        this.lesson_list[this.current_category.id][0]
      );
      this.getCommentsForLessonID(this.current_lesson.id);

      if (this.current_category.sort_position == 0) this.prev_button = false;
      else this.prev_button = true;

      if (this.current_category.sort_position == this.category_list.length - 1)
        this.next_button = false;
      else this.next_button = true;
    },

    nextLesson() {
      this.$store.dispatch(
        "lessonManage/setCurrentLesson",
        this.lesson_list[this.current_category.id][
          this.current_lesson.sort_position + 1
        ]
      );
      this.getCommentsForLessonID(this.current_lesson.id);
      if (
        this.current_lesson.sort_position >
        this.lesson_list[this.current_category.id].length - 2
      ) {
        this.endlesson = false;
      } else {
        this.endlesson = true;
      }
    },

    // downloadItem({
    //   url,
    //   label
    // }) {
    //   Axios.get(url, {
    //       responseType: 'blob'
    //     })
    //     .then(response => {
    //       const blob = new Blob([response.data], {
    //         type: 'application/pdf'
    //       })
    //       const link = document.createElement('a')
    //       link.href = URL.createObjectURL(blob)
    //       link.download = label
    //       link.click()
    //       URL.revokeObjectURL(link.href)
    //     }).catch(console.error)
    // },

    forceFileDownload(response, title) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", title);
      document.body.appendChild(link);
      link.click();
    },

    downloadWithAxios(url, title) {
      Axios({
        method: "get",
        url,
        responseType: "arraybuffer",
      })
        .then((response) => {
          this.forceFileDownload(response, title);
        })
        .catch(() => console.log("error occured"));
    },

    markAsComplete(param) {
      this.$store
        .dispatch("lessonManage/markAsComplete", [
          this.current_lesson.id,
          param,
        ])
        .then(() => {
          if (param == true) this.show_congratulation = true;
          // this.$vs.notify({
          //   color: this.notification_color,
          //   text: this.notification_text,
          //   icon: this.notification_icon,
          // });
        });
    },

    timeDifference(current, previous) {
      previous = new Date(previous);

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + " seconds ago";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " minutes ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + " hours ago";
      } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + " days ago";
      } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + " months ago";
      } else {
        return Math.round(elapsed / msPerYear) + " years ago";
      }
    },

    postComment() {
      var test = this.comment.replace(/\s/g, "");
      if (test != "") {
        // if not space string only...  ;)
        // console.log("do something for post");
        this.$store.dispatch("commentManage/postComment", [
          this.current_lesson.id,
          this.comment,
        ]);
      }
      this.comment = "";
    },
  },
};
</script>

<style>
.lesson-image {
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  /* height: 100%; */
  padding-top: 56.25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  /* background-image: url("../../assets/images/big/img4.jpg"); */
}

.lesson-video {
  width: 100%;
  /* height: 100%; */
}

.lesson-list {
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-overview.con-vs-card .vs-card--content {
  padding: 0;
  padding-right: 10px;
}

/* 
  .lesson-overview .lesson-name {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: relative;
    --max-lines: 2;
    max-height: calc(var(--lh) * var(--max-lines));
    overflow: hidden;
    padding-right: 1rem;
  }

  .lesson-overview .lesson-name::before {
    position: absolute;
    content: "";
    inset-block-end: 0;
    inset-inline-end: 0;
  }
  .lesson-overview .lesson-name::after {
    content: "";
    position: absolute;
    inset-inline-end: 0; 
    width: 1rem;
    height: 1rem;
    background: #212529;
  } */

.lesson-overview .lesson-name {
  white-space: nowrap;
  /* width: 50px;  */
  overflow: hidden;
  text-overflow: ellipsis;
}

.lesson-item:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.lessonitemactive {
  background-color: rgba(0, 0, 0, 1);
  /* background-color: rgb(135, 255, 131); */
}

/* scrollbar */

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* mark as complete button  */

.mark-as-complete {
  margin: 0;
  font-size: 20px;
  border: 2px solid #2962ff;
  color: #2962ff;
  text-align: center;
  cursor: pointer;
}

@media only screen and (max-width: 900px) {
  .lesson-overview.con-vs-card .vs-card--content {
    padding: 0;
    padding-bottom: 10px;
  }

  .lesson-list {
    margin: 10px;
  }
}
</style>
