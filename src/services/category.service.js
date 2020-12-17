import axios from 'axios';
import apiurl from './base_api_url'
// import store from '../store'
import {authHeader} from './authHeader'
const API_URL = apiurl.API_URL+'student/';
class CategoryService { 

   /**
   * ---------get categroy by id -----------------------
   */
  getCategoryByProductID(product_id) {
    return axios
      .get(API_URL+product_id + '/categories?demo', 
        {headers:  authHeader()})
      .then(response => { 
        return response;
      })
      .catch(err => {
        return err;
    });
  }
}
export default new CategoryService();