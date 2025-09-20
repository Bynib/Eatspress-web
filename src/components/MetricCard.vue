<template>
  <div class="bg-gray-200 rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] p-6 flex justify-between items-center hover:shadow-[-6px_-6px_12px_0px_rgba(255,255,255,1.00)] hover:shadow-[6px_6px_12px_0px_rgba(190,190,190,1.00)] transition-all duration-200">
    <div class="flex flex-col gap-2">
      <div class="text-gray-600 text-sm font-normal">{{ title }}</div>
      <div class="text-gray-800 text-2xl font-bold">{{ displayValue }}</div>
    </div>
    <div class="w-12 h-12 bg-gray-200 rounded-full shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] flex items-center justify-center">
      <component :is="icon" class="w-6 h-6" :class="iconClass" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  value: string | number
  icon: any
  iconClass?: string
}>()

const iconClass = computed(() => props.iconClass || 'text-gray-600')

const displayValue = computed(() => {
  if (typeof props.value === 'number') {
    // Handle NaN or invalid numbers
    if (isNaN(props.value) || !isFinite(props.value)) {
      return '0'
    }
    return props.value.toLocaleString()
  }
  return props.value || '0'
})
</script>
