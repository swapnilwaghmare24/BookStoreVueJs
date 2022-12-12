import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import BookCard from '../components/BookCard'
import BookCardList from '../components/BookCardList'
import UserCart from '../components/UserCart.vue'
import { sharedService } from '../service/AppSharedService'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BookCardList',
    component: BookCardList
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/bookCard',
    name: 'BookCard',
    component: BookCard
  },
  {
    path: '/bookCardList',
    name: 'BookCardList',
    component: BookCardList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usercart',
    name: 'UserCart',
    component: UserCart,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (sharedService.IsSignedIn() === false) {
      next({ name: 'SignIn' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router
