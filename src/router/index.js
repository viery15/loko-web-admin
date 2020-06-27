import Vue from 'vue'
import Router from 'vue-router'
import Faq from '@/components/Faq'
import Stoplist from '@/components/Stoplist'
import Sinonim from '@/components/Sinonim'
import Twitter from '@/components/Twitter'
import History from '@/components/History'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name : 'Faq',
      component: Faq
    },
    {
      path: '/faq',
      name : 'Faq',
      component: Faq
    },
    {
      path: '/stoplist',
      name : 'Stoplist',
      component: Stoplist
    },
    {
      path: '/sinonim',
      name : 'Sinonim',
      component: Sinonim
    },
    {
      path: '/twitter',
      name : 'Twitter',
      component: Twitter
    },
    {
      path: '/history',
      name : 'History',
      component: History
    },
  ]
})
