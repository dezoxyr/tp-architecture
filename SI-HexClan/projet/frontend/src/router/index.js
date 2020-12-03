import Vue from 'vue'
import VueRouter from 'vue-router'
//import { component } from 'vue/types/umd'
//import Home from '../views/Home.vue'
import Root from '../components/Root/component.vue'
import Login from '../components/Login/component.vue'
import Register from '../components/Register/component.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: '/',
    name: 'Root',
    component: Root
  }
]

const router = new VueRouter({
  routes
})

export default router
