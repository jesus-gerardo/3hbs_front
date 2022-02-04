import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token: null,
    user: null,
    isLogin: false,
  }, mutations: {
    setToken(state, data){
      state.token = data
    },
    setUser(state, data){
      state.user = data
    },
    setIsLogin(state, data){
      state.isLogin = data
    }
  }, actions: {
    getToken({commit}){
      if(localStorage.getItem('token') != null){
        commit('setIsLogin', true);
        this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      }else{
        commit('setIsLogin', false);
      }
    }
  }
})
