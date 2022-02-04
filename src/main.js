require("./plugins/axios");
import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store/index'

Vue.prototype.$required = v => {
  if(!!v || v===0){
      if((typeof v == 'string') && v.trim() == ''){
          return 'The field is required';  
      }
      return true;
  }else{
    return 'The field is required';  
  }
}

Vue.prototype.$email = v => {
  if((v || '').length==0){
      return true;
  }else{
      return /.+@.+\..+/.test(v) || 'Correo no válido'
  }
},

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
