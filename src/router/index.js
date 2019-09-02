import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import Overview from '@/components/Overview/Overview'

import Training from '@/components/Training/Training'
import StartPage from '@/components/Training/components/StartPage/StartPage'
import VideoPage from '@/components/Training/components/VideoPage/VideoPage'
import Positioning from '@/components/Training/components/Positioning/Positioning'
import Spinning from '@/components/Training/components/Spinning/Spinning'
import Results from '@/components/Training/components/Results/Results'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/overview',
      name: 'Overview',
      component: Overview
    },
    {
      path: '/training',
      component: Training,
      children: [
        {
          path: '',
          name: 'StartPage',
          component: StartPage
        },
        {
          path: 'videoPage/:videoId',
          name: 'VideoPage',
          component: VideoPage,
          props: true
        },
        {
          path: 'positioning/:videoId',
          name: 'Positioning',
          component: Positioning,
          props: true
        },
        {
          path: 'spinning/:videoId',
          name: 'Spinning',
          component: Spinning,
          props: true
        },
        {
          path: 'results',
          name: 'Results',
          component: Results,
          props: false
        }
      ]
    }
  ]
})
