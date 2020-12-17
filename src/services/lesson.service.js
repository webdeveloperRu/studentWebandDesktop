import axios from 'axios';
import apiurl from './base_api_url'
import store from '../store'
import {authHeader} from './authHeader'
const API_URL = apiurl.API_URL+'student/';
class LessonService { 
  /**
   * ---------get lesson list---------
   */
  getLessonList(category_id) {
    return axios
      .get(API_URL+category_id+'/lessons?demo',  {headers:  authHeader()})
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
  searchLesson(keyword) {
    return axios
      .post(API_URL+'search', {keyword: keyword}, {headers:  authHeader()})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }

  markAsComplete(lesson_id, param) {
    return axios
      .put(API_URL + lesson_id + '/mark-as-complete/'+ param , {param: param}, { headers: {'apikey': store.state.auth.user.token, "accept": "application/json" }})
      .then(response => {
        return response;
      })
      .catch(err => {
        return err;
    });
  }
}
export default new LessonService();