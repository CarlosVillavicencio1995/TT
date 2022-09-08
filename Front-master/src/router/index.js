import Vue from 'vue'
import VueRouter from 'vue-router'
import cooki from "../Recursos/cooki";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/sesion_vista.vue'),
  },
  {
    path: '/app',
    name: 'Principal',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/principal_vista.vue'),
    children: [
      {
        path: '/inicio',
        name: 'Inicio',
        props: true,
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Fragmentos/inicio_vista.vue')
      },
      {
        path: '/laboratorio',
        name: 'Laboratorio',
        props: true,
        meta: {
          requiresAuth: true,
          administrador: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Fragmentos/laboratorio_vista.vue')
      },
      {
        path: '/actividad',
        name: 'Actividad',
        props: true,
        meta: {
          requiresAuth: true,
          administrador: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Fragmentos/actividad_vista.vue')
      },
      {
        path: '/grupo',
        name: 'Grupo',
        props: true,
        meta: {
          requiresAuth: true,
          administrador: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Fragmentos/grupo_vista.vue')
      },
      {
        path: '/resultado',
        name: 'Resultado',
        props: true,
        meta: {
          requiresAuth: true,
          administrador: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Fragmentos/resultado_vista.vue')
      },
      {
        path: '/actividad/melanoma/:id/:intento',
        name: 'Selección de imagen',
        props: true,
        meta: {
          requiresAuth: true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Fragmentos/actividad_melanoma_vista.vue')
      },
      {
        path: '/actividad/verifica/melanoma/:id/:intento',
        name: 'Cargar imagen',
        props: true,
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Fragmentos/actividad_diagnostico_melanoma_vista.vue')
      },
    ]
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes

})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {   
    if (!cooki.usuario_iniciado()) {
      next('/')
    } else {
      next();
    }
  } else if (cooki.usuario_iniciado()) {
    next('/inicio')
  } {
    next();
  }
})


export default router