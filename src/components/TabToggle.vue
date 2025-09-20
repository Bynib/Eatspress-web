<template>
  <div class="w-64 h-16 bg-gray-200 rounded-2xl  shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] flex items-center p-2">
    <button
      @click="$emit('tab-change', 'orders')"
      :class="[
        'flex-1 h-12 rounded-xl flex items-center justify-center gap-2 transition-all duration-200',
        activeTab === 'orders' 
          ? 'bg-gray-200 shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]' 
          : 'hover:bg-gray-100'
      ]"
    >
      <Logs class="w-5 h-5" :class="activeTab === 'orders' ? 'text-gray-600' : 'text-gray-400'" />
      <span 
        class="text-sm font-semibold"
        :class="activeTab === 'orders' ? 'text-gray-800' : 'text-gray-600'"
      >
        Orders
      </span>
    </button>
    
    <button
      @click="$emit('tab-change', 'menu')"
      :class="[
        'flex-1 h-12 rounded-xl flex items-center justify-center gap-2 transition-all duration-200',
        activeTab === 'menu' 
          ? 'bg-gray-200 shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]' 
          : 'hover:bg-gray-100'
      ]"
    >
      <Menu class="w-5 h-5" :class="activeTab === 'menu' ? 'text-gray-600' : 'text-gray-400'" />
      <span 
        class="text-sm font-semibold"
        :class="activeTab === 'menu' ? 'text-gray-800' : 'text-gray-600'"
      >
        Menu
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Logs, Menu } from 'lucide-vue-next'

defineProps<{
  activeTab: string
}>()

defineEmits<{
  'tab-change': [tab: string]
}>()
</script>
