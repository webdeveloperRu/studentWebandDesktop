import axios from 'axios';
import apiurl from './base_api_url'
import {
  authHeader
} from './authHeader'
// import router from "../router"
const API_URL = apiurl.API_URL + 'auth/twofa';
class TwoFactorService {
  getTwoFactor() {
    return axios
      .get(API_URL, {
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        // router.replace('/login')
        return err;
      });
  }
  setTwoFactor(otp) {
    return axios
      .put(API_URL, {
        "otp": otp
      }, {
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        // router.replace('/login')
        return err;
      });
  }
  deleteTwoFactor(otp) {
    return axios
      .delete(API_URL + '?otp=' + otp, {
        headers: authHeader()
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        // router.replace('/login')
        return err;
      });
  }
}
export default new TwoFactorService();