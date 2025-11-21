// stores/menu.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSonnerStore } from './sonner'
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
      const res = await useFetch(URL + '/menu', { method: 'GET', credentials: 'include' })
      const data = await res.json()
      if (!res.ok) {
        return sonner.error(data.message)
      }
      items.value = data
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch menu'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const getById = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/menu/${id}`, { method: 'GET', credentials: 'include' })
      const data = await res.json()
      if (!res.ok) {
        return sonner.error(data.message)
      }
      selectedItem.value = data
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to fetch food item'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const create = async (pizza: Partial<Menu>) => {
  isLoading.value = true
  try {
    const form = new FormData()
    form.append('Name', pizza.name!)
    form.append('Description', pizza.description!)
    form.append('Price', String(pizza.price))
    form.append('Category_Id', String(pizza.category_Id))
    form.append('Prep_Time', String(pizza.prep_Time))
    if (pizza.image) form.append('Image', pizza.image as File)

    const res = await useFetch(URL + '/menu', { method: 'POST', body: form, credentials: 'include' })
    const data = await res.json()

    if (!res.ok) {
      sonner.error(data.message ?? 'Failed to create food item')
      return false
    }

    sonner.success('Food item created')
    await getAll()
    return true
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed to create food item'
    sonner.error(msg)
    return false
  } finally {
    isLoading.value = false
  }
}

const update = async (id: number, pizza: Partial<Menu>) => {
  isLoading.value = true
  try {
    const form = new FormData()
    form.append('Name', String(pizza.name))
    form.append('Description', String(pizza.description))
    form.append('Price', String(pizza.price))
    form.append('Category_Id', String(pizza.category_Id))
    form.append('Prep_Time', String(pizza.prep_Time))
    if (pizza.image) form.append('Image', pizza.image as File)

    const res = await useFetch(`${URL}/menu/${id}`, { method: 'PUT', body: form, credentials: 'include' })
    const data = await res.json()

    if (!res.ok) {
      sonner.error(data.message ?? 'Failed to update food item' )
      return false
    }

    sonner.success('Food item updated')
    await getAll()
    return true
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed to update food item'
    sonner.error(msg)
    return false
  } finally {
    isLoading.value = false
  }
}

const remove = async (id: number) => {
  isLoading.value = true
  try {
    const res = await useFetch(`${URL}/menu/${id}`, { method: 'DELETE', credentials: 'include' })
    const data = await res.json()

    if (!res.ok) {
      sonner.error(data.message)
      return false
    }

    sonner.success(data.message)
    items.value = items.value.map(r => r.item_Id === id ? { ...r, isDeleted: true } : r)
    return true
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Failed to delete food item'
    sonner.error(msg)
    return false
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
    remove
  }
})

