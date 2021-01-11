import axios from "axios";
import apiurl from "./base_api_url";
// import store from '../store'
import { authHeader } from "./authHeader";

const API_URL = apiurl.API_URL + "student/my-products";
class ProductService {
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
