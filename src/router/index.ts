import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CustomerMenu from '@/views/Customer/Menu.vue'
import CustomerCart from '@/views/Customer/Cart.vue'
import CustomerOrders from '@/views/Customer/Orders.vue'
import AccountSettings from '@/views/Customer/AccountSettings.vue'
import AdminOrders from '@/views/Admin/AdminOrders.vue'
import AdminMenu from '@/views/Admin/AdminMenu.vue'

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
    {
      path: '/settings',
      name: 'settings',
      component: AccountSettings,
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrders,
    },
    {
      path: '/admin/menu',
      name: 'admin-menu',
      component: AdminMenu,
    },
  ],
})

export default router
