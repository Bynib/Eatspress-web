// stores/cart.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSonnerStore } from './sonner'
import { useAuthStore } from './auth'
import { useFetch } from '@/plugins/api'
import type { Cart } from '@/models/cart'

export const useCartStore = defineStore('cart', () => {
  const sonner = useSonnerStore()
  const auth = useAuthStore()
  const URL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:5135/api'

  const items = ref<Cart[]>([])
  const isLoading = ref(false)

  const getUserCart = async () => {
    if (!auth.user) return sonner.error('User not authenticated')
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/cart/${auth.user.user_Id}`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      items.value = data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch cart'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const addToCart = async (itemId: number, quantity: number) => {
    if (!auth.user) return sonner.error('User not authenticated')
    isLoading.value = true
    try {
      const res = await useFetch(URL + '/cart', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_Id: auth.user.user_Id,
          item_Id: itemId,
          quantity,
        }),
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success('Item added to cart')
      await getUserCart()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to add item to cart'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const updateCart = async (itemId: number, quantity: number) => {
    if (!auth.user) return sonner.error('User not authenticated')
    isLoading.value = true
    try {
      const res = await useFetch(URL + '/cart', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_Id: auth.user.user_Id,
          item_Id: itemId,
          quantity,
        }),
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      await getUserCart()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update cart'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const removeFromCart = async (itemId: number) => {
    if (!auth.user) return sonner.error('User not authenticated')
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/cart/${auth.user.user_Id}/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      items.value = items.value.filter((i) => i.item_Id !== itemId)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to remove item from cart'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  return {
    items,
    isLoading,
    getUserCart,
    addToCart,
    updateCart,
    removeFromCart,
  }
})
