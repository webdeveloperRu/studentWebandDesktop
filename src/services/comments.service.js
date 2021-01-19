import axios from "axios";
import apiurl from "./base_api_url";
import store from "../store";
import { authHeader } from "./authHeader";
import { authAcademyHeader } from "./authAcademyHeader";

const API_URL = apiurl.API_URL + "student/";
const API_ACADEMY_URL = apiurl.API_ACADEMY_URL;
class CommentsService {
  /**
   * ---------get comment list---------
   */
  getCommentList(lesson_id) {
    return axios
      .get(API_URL + lesson_id + "/comments", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get comment list demo---------
   */
  getCommentListDemo(lesson_id) {
    return axios
      .get(API_URL + lesson_id + "/comments?demo", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------get comment list preview---------
   */
  getCommentListPreview(lesson_id) {
    return axios
      .get(API_ACADEMY_URL + "lesson/" + lesson_id + "/comments", {
        headers: authAcademyHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------post comment list---------
   */
  postComment(lesson_id, comment) {
    return axios
      .post(
        API_URL + lesson_id + "/comments",
        {
          comment: comment,
        },
        {
          headers: {
            apikey: store.state.auth.user.token,
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------post comment list---------
   */
  postCommentPreview(lesson_id, comment) {
    return axios
      .post(
        API_ACADEMY_URL + "comments/",
        {
          comment: comment,
          lesson_id: lesson_id,
        },
        {
          headers: authAcademyHeader(),
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * ---------post comment list demo---------
   */
  postCommentDemo(lesson_id, comment) {
    return axios
      .post(
        API_URL + lesson_id + "/comments?demo",
        {
          comment: comment,
        },
        {
          headers: {
            apikey: store.state.auth.user.token,
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
export default new CommentsService();
