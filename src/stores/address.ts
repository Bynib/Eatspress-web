// stores/address.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSonnerStore } from './sonner'
import { useAuthStore } from './auth'
import { useFetch } from '@/plugins/api'
import type { Address } from '@/models/address'

export const useAddressStore = defineStore('address', () => {
  const sonner = useSonnerStore()
  const auth = useAuthStore()
  const URL = import.meta.env.VITE_BASE_URL ?? 'http://localhost:5135/api'

  const addresses = ref<Address[]>([])
  const selectedAddress = ref<Address | null>(null)
  const isLoading = ref(false)

  const create = async (addr: Address) => {
    if (!auth.user) return sonner.error('User not authenticated')
    isLoading.value = true
    try {
      const res = await useFetch(URL + '/address', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addr),
      })
      const data = await res.json()
      console.log('cr', data)
      if (!res.ok) return sonner.error(data.message)
      sonner.success('Address added successfully')
      addresses.value.push(data)
      return data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to add address'
      console.error(msg)
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const getById = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/address/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      selectedAddress.value = data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch address'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const getByUser = async (userId: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/address/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      addresses.value = data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch addresses'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const update = async (addr: Address) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/address`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addr),
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success('Address updated successfully')
      const i = addresses.value.findIndex((a) => a.address_Id === data.address_Id)
      if (i !== -1) addresses.value[i] = data
      return data
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update address'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  const remove = async (id: number) => {
    isLoading.value = true
    try {
      const res = await useFetch(`${URL}/address/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) return sonner.error(data.message)
      sonner.success(data.message)
      addresses.value = addresses.value.filter((a) => a.address_Id !== id)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete address'
      sonner.error(msg)
    } finally {
      isLoading.value = false
    }
  }

  return {
    addresses,
    selectedAddress,
    isLoading,
    create,
    getById,
    getByUser,
    update,
    remove,
  }
})
