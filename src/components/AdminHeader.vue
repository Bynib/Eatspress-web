<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Utensils, SquareMenu, Logs, User, LogOut } from 'lucide-vue-next'

defineProps<{
  activeTab: string
}>()

defineEmits<{
  'tab-change': [tab: string]
}>()

const auth = useAuthStore()
</script>
<template>
  <div
    class="w-screen h-20 bg-gray-200 border-b border-gray-300/50 flex justify-between items-center px-4 sm:px-6 lg:px-8"
  >
    <!-- Logo Section -->
    <div class="flex items-center gap-4">
      <div
        class="w-11 h-11 p-3 bg-gradient-to-r from-rose-600 to-orange-600 rounded-full shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] flex items-center justify-center"
      >
        <Utensils class="w-5 h-5 text-white" />
      </div>
      <h1 class="text-2xl font-bold text-gray-800">Eatspress</h1>
    </div>

    <!-- Navigation Section - Centered -->
    <!-- <div class="flex-1 flex items-center justify-center gap-10">
      <button
        class="flex items-center gap-1.5 px-3 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
        :class="{ 'text-gray-800': activeTab === 'menu' }"
        @click="$emit('tab-change', 'menu')"
      >
        <SquareMenu class="w-6 h-6" />
        <span class="text-sm font-semibold">Menu</span>
      </button>
      <button
        class="flex items-center gap-1.5 px-3 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
        :class="{ 'text-gray-800': activeTab === 'orders' }"
        @click="$emit('tab-change', 'orders')"
      >
        <Logs class="w-6 h-6" />
        <span class="text-sm font-semibold">Orders</span>
      </button>
    </div> -->

    <!-- Admin Section -->
    <div class="flex items-center gap-2.5">
      <span class="text-sm font-semibold text-gray-600">Admin</span>
      <div
        @click="async () => await auth.logout()"
        class="cursor-pointerw-8 h-8 bg-gray-200 rounded-full shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] flex items-center justify-center"
      >
        <LogOut class="w-4 h-4 text-gray-600" />
      </div>
    </div>
  </div>
</template>
