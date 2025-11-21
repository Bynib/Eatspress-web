import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CustomerMenu from '@/views/Customer/Menu.vue'
import CustomerCart from '@/views/Customer/Cart.vue'
import CustomerOrders from '@/views/Customer/Orders.vue'
import AccountSettings from '@/views/Customer/AccountSettings.vue'
import AdminOrders from '@/views/Admin/AdminOrders.vue'
import AdminMenu from '@/views/Admin/AdminMenu.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresGuest: true
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: CustomerMenu,
      meta:{
        requiresUser: true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CustomerCart,
      meta:{
        requiresUser: true
      }
    },
    {
      path: '/orders',
      name: 'orders',
      component: CustomerOrders,
      meta:{
        requiresUser: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: AccountSettings,
      meta:{
        requiresUser: true
      }
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: AdminOrders,
      meta:{
        requiresAdmin: true
      }
    },
    {
      path: '/admin/menu',
      name: 'admin-menu',
      component: AdminMenu,
      meta:{
        requiresAdmin: true
      }
    },
  ],
})

router.beforeEach(async(to, from, next) =>{
  const auth = useAuthStore()
  if(to.meta.requiresGuest){
    if(auth.isAuthenticated){
      if (auth.isAdmin) {
        next('/admin/menu')
      } else {
        next('/menu')
      }
    }
  }
  if(to.meta.requiresAdmin || to.meta.requiresUser){
    if(!auth.isAuthenticated) next('/')
  }
  if(to.meta.requiresUser){
    if(auth.isAdmin){
      next("/admin/menu")
    }
  }
  if(to.meta.requiresAdmin){
    if(!auth.isAdmin){
      next("/menu")
    }
  }
  next()
})

export default router
