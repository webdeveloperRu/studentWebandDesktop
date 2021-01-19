import axios from "axios";
import apiurl from "./base_api_url";
import { authHeader } from "./authHeader";
import { authAcademyHeader } from "./authAcademyHeader";
import store from "../store";
const API_URL = apiurl.API_URL + "student/my-products";
const API_ACADEMY_URL = apiurl.API_ACADEMY_URL + "products/";
class ProductService {
  /**
   * ---------get proudct list Preview---------
   */
  getProductListPreview() {
    return axios
      .get(API_ACADEMY_URL, {
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
   * ---------get proudct list---------
   */
  getProductList() {
    return axios
      .get(API_URL, {
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
   * ---------get proudct list Demo---------
   */
  getProductListDemo() {
    return axios
      .get(API_URL + "?demo", {
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
export default new ProductService();
