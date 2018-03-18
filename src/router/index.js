import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

// Components
import Auth from '@/auth/Auth'
import Home from '@/app/home/Home'
import MediaDetail from '@/app/media/MediaDetail'
import ListView from '@/app/media/ListView'
import Movie from '@/app/movie/Movie'
import Serie from '@/app/serie/Serie'
import Other from '@/app/other/Other'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: {
        name: 'Auth'
      }
    },
    {
      path: '/',
      redirect: {
        name: 'Auth'
      }
    },
    {
      path: 'Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Home',
      name: 'Home',
      components: {
        default: Home,
        modal: MediaDetail
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/ListView',
      name: 'ListView',
      components: {
        default: ListView,
        modal: MediaDetail
      },
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: Movie,
      meta: { requiresAuth: true }
    },
    {
      path: '/Serie',
      name: 'Serie',
      component: Serie,
      meta: { requiresAuth: true }
    },
    {
      path: '/Other',
      name: 'Other',
      component: Other,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // skip login
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('auth')
  else if (to.name === 'Auth' && currentUser) next('home')
  else next()
})

export default router
