import Vue from 'vue'
import Router from 'vue-router'
import Faq from '@/components/Faq'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name : 'Faq',
      component: Faq
    },
    
  ]
})
