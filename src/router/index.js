import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import OrderAck from '../components/OrderAck.vue'
import BookCard from '../components/BookCard'
import BookCardList from '../components/BookCardList'
import UserCart from '../components/UserCart.vue'
import { sharedService } from '../service/AppSharedService'
import requiresAuth from './middleware/requiresAuth'
import myorders from '../components/MyOrders.vue'
import cancelorders from '../components/CancelOrders.vue'
import processorders from '../components/ProcessOrder.vue'
import completeorders from '../components/CompleteOrder.vue'


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
    path: '/myorders',
    name: 'myorders',
    component: myorders
  },
  {
    path: '/cancelorders',
    name: 'cancelorders',
    component: cancelorders
  },

  {
    path: '/processorders',
    name: 'processorders',
    component: processorders
  },

  {
    path: '/completeorders',
    name: 'completeorders',
    component: completeorders
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
      middlewares: [
        requiresAuth
      ]
    }
  },
  {
    path: '/usercart',
    name: 'UserCart',
    component: UserCart,
    meta: {
      middlewares: [
        requiresAuth
      ]
    }
  },
  {
    path: '/order',
    name: 'OrderAck',
    component: OrderAck
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
 
  if (!to.meta.middlewares) {
    return next()
  }
  const middlewares = to.meta.middlewares
  return middlewares[0]({ to, from, next })
})

export default router
