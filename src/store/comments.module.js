import CommentService from "../services/comments.service";
import store from "./index";
const initialState = {
  current_comment: [],
  new_comment: "",
  comment_list: [],
};
export const commentManage = {
  namespaced: true,
  state: initialState,
  actions: {
    /**
     * ---------get comment list real-------------------
     */
    getCommentList({ commit }, lesson_id) {
      return CommentService.getCommentList(lesson_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getCommentListSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get comment list real-------------------
     */
    getCommentListDemo({ commit }, lesson_id) {
      return CommentService.getCommentListDemo(lesson_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getCommentListSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------get comment list real-------------------
     */
    getCommentListPreview({ commit }, lesson_id) {
      return CommentService.getCommentListPreview(lesson_id).then(
        (res) => {
          if (res.status === 200) {
            commit("getCommentListSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------post comment list-------------------
     */
    postComment({ commit }, [lesson_id, comment]) {
      return CommentService.postComment(lesson_id, comment).then(
        (res) => {
          if (res.status === 200) {
            commit("postCommentSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------post comment list demo-------------------
     */
    postCommentDemo({ commit }, [lesson_id, comment]) {
      return CommentService.postCommentDemo(lesson_id, comment).then(
        (res) => {
          if (res.status === 200) {
            commit("postCommentSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
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
     * ---------post comment list-------------------
     */
    postCommentPreview({ commit }, [lesson_id, comment]) {
      return CommentService.postCommentPreview(lesson_id, comment).then(
        (res) => {
          if (res.status === 200) {
            commit("postCommentSuccess", res);
          } else {
            if (res.response == undefined)
              commit("NETWORK_ERROR", null, {
                root: true,
              });
            else
              commit("REQUEST_FAILED", res.response, {
                root: true,
              });
          }
        },
        (error) => {
          commit("REQUEST_FAILED", error.response, {
            root: true,
          });
        }
      );
    },

  },

  getters: {
    comment_list: (state) => state.comment_list,
    current_comment: (state) => state.current_comment,
  },

  mutations: {
    /**
     * ---------get comment List  ----------------
     */
    getCommentListSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_text = "Found " + res.data.length + " comments";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      if (res.data == undefined) {
        state.comment_list = [];
      } else {
        state.comment_list = res.data.data;
      }
    },

    postCommentSuccess(state, res) {
      store.state.status = {
        got: true,
      };
      store.state.notification_text = "Post Comment Success!";
      store.state.notification_icon = "info";
      store.state.notification_color = "primary";
      if (res.data == undefined) {
        state.new_comment = [];
      } else {
        state.new_comment = res.data.data;
      }
    },

    RESET_MODULE(state) {
      Object.assign(state, initialState);
    },
  },
};
