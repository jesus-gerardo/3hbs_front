"use strict";

import Vue from "vue";
import axios from "axios";
import router from "./../router/index";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: "http://3hbs_test.test/api/"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
  function(config) {
    if(localStorage.getItem('token')){
      config.headers['Authorization'] = localStorage.getItem('token');
    }
    return config;
  },
  function(error) {
    if(error.response.status == 401){
      router.push({name:'login'});
    }
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if(error.response.status == 401){
      router.push({name:'login'});
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$http = _axios;