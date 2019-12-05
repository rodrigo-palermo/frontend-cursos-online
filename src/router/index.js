import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Conta from '../views/Conta.vue'
import Login from '../components/login/Login.vue'
import Home from '../views/Home.vue'
import Cadastro from '../views/CadastroOld.vue'
import Categoria from '../views/Categoria.vue'
import Curso from '../views/Curso.vue'
import Perfil from '../views/Perfil.vue'
import Usuario from '../views/Usuario.vue'
import Turma from '../views/Turma.vue'

Vue.use(Router)

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
    component: Cadastro,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: Categoria,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/curso',
    name: 'curso',
    component: Curso,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: Perfil,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: Usuario,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/turma',
    name: 'turma',
    component: Turma,
    meta: {
      requiresAuth: true
    }
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

const router = new Router({
  mode: 'history',
  routes
})

// verificar se ok
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
