import store from "../store";

let authHeader = function() {
  let header = {
    apikey: store.state.auth.user.token,
    "Content-Type": "application/json",
  };
  return header;
};
export { authHeader };
