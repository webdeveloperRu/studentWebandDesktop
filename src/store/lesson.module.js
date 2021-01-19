import LessonService from "../services/lesson.service";
import store from "./index";
const initialState = {
  lesson_list: {},
  current_lesson: [],
  current_category_id: "",
  search_result: [],
  downloadfile_list: []
};
export const lessonManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get lesson list-------------------
     */
    getLessonList({ commit }, category_id) {
      return LessonService.getLessonList(category_id).then(
        (res) => {
          if (res.status === 200) {
            commit("setCategoryID", category_id);
            commit("getLessonListSuccess", {
              res,
              category_id,
            });
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              commit("initCurrentCategoryID");
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
          commit("initCurrentCategoryID");
        }
      );
    },

    /**
     * ---------get lesson list demo-------------------
     */
    getLessonListDemo({ commit }, category_id) {
      return LessonService.getLessonListDemo(category_id).then(
        (res) => {
          if (res.status === 200) {
            commit("setCategoryID", category_id);
            commit("getLessonListSuccess", {
              res,
              category_id,
            });
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              commit("initCurrentCategoryID");
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
          commit("initCurrentCategoryID");
        }
      );
    },

    /**
     * ---------get lesson list preview-------------------
     */
    getLessonListPreview({ commit }, category_id) {
      return LessonService.getLessonListPreview(category_id).then(
        (res) => {
          if (res.status === 200) {
            commit("setCategoryID", category_id);
            commit("getLessonListSuccess", {
              res,
              category_id,
            });
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              commit("initCurrentCategoryID");
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
          commit("initCurrentCategoryID");
        }
      );
    },

    setCurrentLesson({ commit }, lesson) {
      commit("setCurrentLesson", lesson);
    },

    searchLesson({ commit }, keyword) {
      return LessonService.searchLesson(keyword).then(
        (res) => {
          if (res.status === 200) {
            // commit('setSearchLesson', category_id)
            commit("searchLessonListSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
              // commit("initCurrentCategoryID")
            }
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
          // commit("initCurrentCategoryID")
        }
      );
    },

    markAsComplete({ commit }, [lesson_id, param]) {
      return LessonService.markAsComplete(lesson_id, param).then(
        (res) => {
          if (res.status === 200) {
            commit("markAsCompleteSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
            }
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
     * ---------get download file list------------
     */
    getDownloadFileListPreview({
      commit
    }, lesson_id) {
      return LessonService.getDownloadFileListPreview(lesson_id).then(
        res => {
          if (res.status === 200) {
            commit('getDownloadFileListSuccess', res);
          } else {
            if (res.response == undefined)
              commit('NETWORK_ERROR', null, {
                root: true
              });
            else {
              commit("REQUEST_FAILED", res.response, {
                root: true
              });
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {
            root: true
          });
        }
      );
    },

    


  },

  getters: {
    lesson_list: (state) => state.lesson_list,
    search_result: (state) => state.search_result,
    current_lesson: (state) => state.current_lesson,
    current_downloadfile: (state) => state.current_downloadfile,
    downloadfile_list: (state) => state.downloadfile_list,
  },

  mutations: {
    getDownloadFileListSuccess(state, res) {
      store.state.status = {
        got: true
      };
      store.state.notification_text = 'download file list got';
      store.state.notification_icon = 'info';
      store.state.notification_color = 'primary';
      state.downloadfile_list = res.data.items
    },
    setCategoryID(state, category_id) {
      state.current_category_id = category_id;
    },
    /**
     * ---------get lesson by ID Success ----------------
     */
    // getLessonByIDSuccess(state, res){
    //   store.state.status = { got: true};
    //   state.current_lesson = res.data
    //   store.state.notification_text = 'lesson is successfully set';
    //   store.state.notification_icon = 'info';
    //   store.state.notification_color = 'primary';
    // },

    /**
     * ---------get lesson List  ----------------
     */
    getLessonListSuccess(state, { res, category_id }) {
      store.state.status = {
        got: true,
      };
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      store.state.notification_text = "lesson list successfully got";
      // if(res.data.items.length == 0)
      //   state.lesson_list[state.current_category_id] = []
      // else
      //   state.lesson_list[state.current_category_id] = res.data.items;
      // state.current_category_id=''

      if (res.data.data == undefined) state.lesson_list[category_id] = [];
      else state.lesson_list[category_id] = res.data.data;
    },

    setCurrentLesson(state, lesson) {
      state.current_lesson = lesson;
    },

    initCurrentCategoryID(state) {
      state.current_category_id = "";
    },

    searchLessonListSuccess(state, res) {
      state.search_result = [];
      if (res.data.data.length == 0) {
        store.state.notification_icon = "info";
        store.state.notification_color = "primary";
        store.state.notification_text = "No search result";
      } else {
        state.search_result = res.data.data;
      }
    },

    RESET_MODULE(state) {
      state.lesson_list = {};
      Object.assign(state, initialState);
    },
  },
};
