import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/auth/login.vue'

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
        component: Airports
      },
      {
        path: 'airlines',
        name: 'airlines',
        component: Airlines
      },
      {
        path: 'fligths',
        name: 'fligths',
        component: Fligths
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
