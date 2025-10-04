// stores/menu.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSonnerStore } from './sonner'
import { useAuthStore } from './auth'
import { useFetch } from '@/plugins/api'
import type { Menu } from '@/models/menu'

export const useMenuStore = defineStore('menu', () => {
  const sonner = useSonnerStore()
  const URL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:5135/api'

  const items = ref<Menu[]>([])
  const selectedItem = ref<Menu | null>(null)
  const isLoading = ref(false)

  const getAll = async () => {
    isLoading.value = true
    try {
      const res = await useFetch(URL + '/menu', {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      console.table(data)
      if (!res.ok) return sonner.error(data.message)
      items.value = data
      console.log('items', items.value)
    } catch (err: unknown) {
      console.error(err)
      const msg = err instanceof Error ? err.message : 'Failed to fetch menu'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const getById = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/menu/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      selectedItem.value = data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch food item'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const create = async (pizza: Partial<Menu>) => {
    isLoading.value = true
    console.log('pizza', pizza)
    const formData = new FormData()
    formData.append('Name', pizza.name!)
    formData.append('Description', pizza.description!)
    formData.append('Price', String(pizza.price))
    formData.append('Category_Id', String(pizza.category_Id))
    formData.append('Prep_Time', String(pizza.prep_Time))
    if (pizza.image) formData.append('Image', pizza.image as File)
    console.log('formData', formData)
    try {
      const res = await useFetch(URL + '/menu', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success('Food item created')
      await getAll()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to create food item'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const update = async (id: number, pizza: Partial<Menu>) => {
    const formData = new FormData()
    formData.append('Name', String(pizza.name))
    formData.append('Description', String(pizza.description))
    formData.append('Price', String(pizza.price))
    formData.append('Category_Id', String(pizza.category_Id))
    formData.append('Prep_Time', String(pizza.prep_Time))
    if (pizza.image) formData.append('Image', pizza.image as File)
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/menu/${id}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success('Food item updated')
      await getAll()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update food item'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const remove = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/menu/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success(data.message)
      items.value = items.value.filter((i) => i.item_Id !== id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete food item'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  return {
    items,
    selectedItem,
    isLoading,
    getAll,
    getById,
    create,
    update,
    remove,
  }
})
