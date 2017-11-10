import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/auth/Auth'
import Home from '@/app/home/Home'
import Movie from '@/app/movie/Movie'
import Serie from '@/app/serie/Serie'
import Other from '@/app/other/Other'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/Serie',
      name: 'Serie',
      component: Serie
    },
    {
      path: '/Other',
      name: 'Other',
      component: Other
    }
  ]
})
