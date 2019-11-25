import Vue from 'vue'
import VueRouter from 'vue-router'
import Conta from '../views/Conta.vue'
import Login from '../components/login/Login.vue'
import Home from '../views/Home.vue'
import Cadastro from '../views/Cadastro.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/conta',
    name: 'conta',
    component: Conta
  },
   {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: Cadastro
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
