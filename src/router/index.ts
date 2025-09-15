import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CustomerMenu from '@/views/Customer/Menu.vue'
import CustomerCart from '@/views/Customer/Cart.vue'
import CustomerOrders from '@/views/Customer/Orders.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/menu',
      name: 'menu',
      component: CustomerMenu,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CustomerCart,
    },
    {
      path: '/orders',
      name: 'orders',
      component: CustomerOrders,
    },
  ],
})

export default router
