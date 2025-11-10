// stores/order.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSonnerStore } from './sonner'
import { useAuthStore } from './auth'
import { useFetch } from '@/plugins/api'
import type { Order } from '@/models/order'
import router from '@/router'
import { useCartStore } from './cart'

export const useOrderStore = defineStore('order', () => {
  const cart = useCartStore()
  const sonner = useSonnerStore()
  const auth = useAuthStore()
  const URL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:5135/api'

  const orders = ref<Order[]>([])
  const selectedOrder = ref<Order | null>(null)
  const isLoading = ref(false)

  const placeOrder = async (order: Order) => {
    if (!auth.user) return sonner.error('User not authenticated')
    isLoading.value = true
    try {
      const res = await useFetch(URL + '/order', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success('Order placed successfully')
      order.details.forEach(async (element) => {
        await cart.removeFromCart(element.item_Id)
      })
      router.push('/orders')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to place order'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const getById = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/order/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
        selectedOrder.value = data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch order'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const getByUser = async (userId: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/order/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      console.log('data',data)
      orders.value = data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch user orders'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const getAll = async () => {
    isLoading.value = true
    try {
      const res = await useFetch(URL + '/order', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      orders.value = data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch orders'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const updateStatus = async (orderId: number, statusId: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/order/${orderId}/status/${statusId}`, {
        method: 'PUT',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success('Order status updated')
      await getAll()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update status'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const cancel = async (orderId: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/order/${orderId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success(data.message)
      orders.value = orders.value.filter((o) => o.order_Id !== orderId)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to cancel order'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  return {
    orders,
    selectedOrder,
    isLoading,
    placeOrder,
    getById,
    getByUser,
    getAll,
    updateStatus,
    cancel,
  }
})
