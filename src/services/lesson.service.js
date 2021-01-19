import axios from "axios";
import apiurl from "./base_api_url";
import store from "../store";
import { authHeader } from "./authHeader";
import { authAcademyHeader } from "./authAcademyHeader";

const API_URL = apiurl.API_URL + "student/";
const API_ACADEMY_URL = apiurl.API_ACADEMY_URL ;

class LessonService {
  /**
   * ---------get lesson list---------
   */
  getLessonList(category_id) {
    return axios
      .get(API_URL + category_id + "/lessons", {
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
   * ---------get downlaods-----------------
   */

  getDownloadFileListPreview(lesson_id) {
    return axios
      .get(apiurl.API_ACADEMY_URL + 'downloads/' + lesson_id, {
        headers: authAcademyHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
      });

  }
  /**
   * ---------get lesson list---------
   */
  getLessonListDemo(category_id) {
    return axios
      .get(API_URL + category_id + "/lessons?demo", {
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
   * ---------get lesson list---------
   */
  getLessonListPreview(category_id) {
    return axios
      .get(API_ACADEMY_URL + "category/" + category_id + "/lessons", {
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
   * ---------get lesson list---------
   */
  searchLesson(keyword) {
    return axios
      .post(
        API_URL + "search",
        {
          keyword: keyword,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  markAsComplete(lesson_id, param) {
    return axios
      .put(
        API_URL + lesson_id + "/mark-as-complete/" + param,
        {
          param: param,
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
export default new LessonService();
