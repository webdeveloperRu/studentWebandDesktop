import axios from "axios";
import apiurl from "./base_api_url";
// import store from '../store'
import { authHeader } from "./authHeader";
import { authAcademyHeader } from "./authAcademyHeader";
const API_URL = apiurl.API_URL + "student/";
const API_ACADEMY_URL = apiurl.API_ACADEMY_URL + "products/";

class CategoryService {
  /**
   * ---------get categroy by id demo -----------------------
   */
  getCategoryByProductIDDemo(product_id) {
    return axios
      .get(API_URL + product_id + "/categories?demo", {
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
   * ---------get categroy by id demo -----------------------
   */
  getCategoryByProductIDPreview(product_id) {
    return axios
      .get(API_ACADEMY_URL + product_id + "/categories", {
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
   * ---------get categroy by id -----------------------
   */
  getCategoryByProductID(product_id) {
    return axios
      .get(API_URL + product_id + "/categories", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}
export default new CategoryService();
