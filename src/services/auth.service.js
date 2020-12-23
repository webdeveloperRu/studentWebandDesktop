import axios from "axios";
import apiurl from "./base_api_url";
import store from "../store";
import { authHeader } from "./authHeader";

const API_URL = apiurl.API_URL + "auth/";
class AuthService {
  login(user, rememberme) {
    return axios
      .post(API_URL + "login", {
        email: user.email,
        password: user.password,
        otp: user.otp,
      })
      .then((response) => {
        if (response.data.token) {
          if (rememberme) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        }
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  logout() {
    return axios
      .get(API_URL + "logout", {
        headers: {
          apikey: store.state.auth.user.token,
          accept: "application/json",
        },
      })
      .then((response) => {
        localStorage.removeItem("user");
        return response;
      })
      .catch((err) => {
        localStorage.removeItem("user");
        return err;
      });
  }

  register(user) {
    return axios
      .post(
        API_URL + "register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
          otp: user.otp,
        },
        {
          headers: {
            Auth: "allow",
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

  forgotPassword(useremail) {
    return axios
      .post(
        API_URL + "forgot-password",
        {
          email: useremail,
        },
        {
          headers: {
            Auth: "allow",
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

  resetPassword(user, emailcode) {
    return axios
      .post(
        API_URL + "reset-password?code=" + emailcode,
        {
          email: user.email,
          "email-code": emailcode,
          newpassword: user.password,
        },
        {
          headers: {
            Auth: "allow",
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

  changePassword(password, newpassword, verifypassword) {
    return axios
      .post(
        API_URL + "change-password",
        {
          current_password: password,
          new_password: newpassword,
          verify_password: verifypassword,
        },
        {
          headers: {
            apikey: store.state.auth.user.token,
          },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }

  userLog() {
    return axios
      .get(API_URL + "userlog/", {
        headers: {
          apikey: store.state.auth.user.token,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  getSettings() {
    return axios
      .get(API_URL + "settings", {
        headers: authHeader(),
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  updateSettings(account_details) {
    let header = {
      apikey: store.state.auth.user.token,
      accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
    var FormData = require("form-data");

    var data = new FormData();

    data.append("email", account_details.email);
    data.append("name", account_details.name);
    data.append("time_zone", account_details.time_zone);
    data.append("avatar", account_details.avatar);

    return axios
      .post(API_URL + "settings", data, {
        headers: header,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  removeAvatar() {
    return axios
      .delete(API_URL + "settings/avatar", {
        headers: {
          apikey: store.state.auth.user.token,
          accept: "application/json",
        },
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new AuthService();
