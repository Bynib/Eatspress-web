// stores/user.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/plugins/api'
import { useSonnerStore } from './sonner'
import type { User } from '@/models/user'

export const useUserStore = defineStore('user', () => {
  const sonner = useSonnerStore()
  const URL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:5135/api'

  const users = ref<User[]>([])
  const isLoading = ref(false)

  const fetchAll = async () => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/user/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      users.value = data
      return data
    } catch (e: unknown) {
      if(e instanceof Error) sonner.error(e.message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const fetchById = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/user/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      return data
    } catch (e: unknown) {
      if(e instanceof Error) sonner.error(e.message)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const deleteUser = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/user/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)

      sonner.success(data.message)
      users.value = users.value.filter((u: User) => u.user_Id !== id)
      return true
    } catch (e: unknown) {
      if(e instanceof Error) sonner.error(e.message)
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    users,
    isLoading,
    fetchAll,
    fetchById,
    deleteUser,
  }
})
