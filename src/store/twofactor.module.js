import TwoFactorService from '../services/twofactor.service';
import store from '.'
const initialState = {
  twofa_key:'',
};
export const twofaManage = {
  namespaced: true,
  state: initialState,
  actions: {
    getTwoFactor({commit}) {
      return TwoFactorService.getTwoFactor().then(
        res => {
          if(res.status ===200){
            commit('getTwoFactorSuccess', res);
          }
          else{
            if(res.response == undefined)
                commit('NETWORK_ERROR', null, { root: true });
            else {
              commit("REQUEST_FAILED", res.response, {root: true});              
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {root: true});
        }
      );
    },
    setTwoFactor({commit},otp) {
      return TwoFactorService.setTwoFactor(otp).then(
        res => {
          if(res.status ===200){
            commit('setTwoFactorSuccess');
          }
          else{
            if(res.response == undefined)
                commit('NETWORK_ERROR', null, { root: true });
            else {
              commit("REQUEST_FAILED", res.response, {root: true});              
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {root: true});
        }
      );
    },

    deleteTwoFactor({commit}, otp) {
      return TwoFactorService.deleteTwoFactor(otp).then(
        res => {
          if(res.status ===200){
            commit('deleteTwoFactorSuccess');
          }
          else{
            if(res.response == undefined)
                commit('NETWORK_ERROR', null, { root: true });
            else {
              commit("REQUEST_FAILED", res.response, {root: true});              
            }
          }
        },
        error => {
          commit("REQUEST_FAILED", error.response, {root: true});
        }
      );
    },
  },
  getters: {
    twofa_key: state=>state.twofa_key,
  },
  mutations: {
    getTwoFactorSuccess(state, res){
      store.state.status = { got: true};
      state.twofa_key = res.data.twoFAKey;
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text= 'success to get two factor key';
    },
    
    deleteTwoFactorSuccess(){
      store.state.status = { got: true};
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text= 'success to delete twofa key';
      store.state.auth.user.data.twoFALoggedin = false;
    },
    
    setTwoFactorSuccess(){
      store.state.status = { got: true};
      store.state.notification_icon = "info"
      store.state.notification_color = "primary"
      store.state.notification_text= 'success to set two factor log in';
      store.state.auth.user.data.twoFALoggedin = true;

    },
    RESET_MODULE (state) {
      
      Object.assign(state, initialState)
     }

    
  }
};