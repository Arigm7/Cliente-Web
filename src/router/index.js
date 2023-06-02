import Vue from 'vue'
import VueRouter from 'vue-router'
import Principal from '../views/Principal.vue'
import Pagina2 from '../views/Pagina2.vue'
import login from '../views/InicioSesion.vue'
//import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'principal',
    component: Principal
  },
  {
    path: '/pagina2',
    name: 'pagina2',
    component: Pagina2
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  /*{
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import( webpackChunkName: "about"  '../views/AboutView.vue')
    }
  }*/
]

const router = new VueRouter({
  routes
})

export default router
