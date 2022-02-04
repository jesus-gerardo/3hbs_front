import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/auth/login.vue'

import Auth from "./../middleware/auth";
import Main from "@/layout/main.vue";
import Airports from "@/views/airports.vue";
import Airlines from "@/views/airlines.vue";
import Fligths from "@/views/fligths.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path:'/admin',
    name: 'admin',
    redirect: '/admin/airports',
    component: Main,
    children:[
      {
        path: 'airports',
        name: 'airports',
        component: Airports,
        meta: {
          middleware: Auth
        }
      },
      {
        path: 'airlines',
        name: 'airlines',
        component: Airlines,
        meta: {
          middleware: Auth
        }
      },
      {
        path: 'fligths',
        name: 'fligths',
        component: Fligths,
        meta: {
          middleware: Auth
        }
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// middleware
router.beforeEach((to, from, next)=>{
  if(to.meta.middleware){
    const middle = to.meta.middleware;
    const context = {to, from, next};
    return middle({...context});
  }
  return next();
})

export default router
