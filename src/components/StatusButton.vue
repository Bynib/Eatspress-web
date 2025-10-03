<template>
  <button
    @click="$emit('click')"
    :class="buttonClasses"
    class="relative rounded-full shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] flex items-center gap-2 px-3 py-1.5 transition-all duration-200"
  >
    <div class="w-4 h-4 flex items-center justify-center">
      <component :is="icon" class="w-3.5 h-3.5" :class="iconClass" />
    </div>
    <span class="text-xs font-semibold capitalize leading-none" :class="textClass">{{ status }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Clock, ChefHat, CheckCircle, Truck } from 'lucide-vue-next'

const props = defineProps<{
  status: 'pending' | 'preparing' | 'ready' | 'delivered'
  isActive: boolean
}>()

defineEmits<{
  click: []
}>()

const statusIcons = {
  pending: Clock,
  preparing: ChefHat,
  ready: CheckCircle,
  delivered: Truck
}

const icon = computed(() => statusIcons[props.status])

const buttonClasses = computed(() => {
  if (props.isActive) {
    switch (props.status) {
      case 'pending':
        return 'bg-yellow-100 shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]'
      case 'preparing':
        return 'bg-blue-100 shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]'
      case 'ready':
        return 'bg-green-100 shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]'
      case 'delivered':
        return 'bg-gray-100 shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]'
      default:
        return 'bg-gray-200'
    }
  }
  return 'bg-gray-200'
})

const iconClass = computed(() => {
  if (props.isActive) {
    switch (props.status) {
      case 'pending':
        return 'text-yellow-600'
      case 'preparing':
        return 'text-blue-600'
      case 'ready':
        return 'text-green-600'
      case 'delivered':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }
  return 'text-gray-600'
})

const textClass = computed(() => {
  if (props.isActive) {
    switch (props.status) {
      case 'pending':
        return 'text-yellow-600'
      case 'preparing':
        return 'text-blue-600'
      case 'ready':
        return 'text-green-600'
      case 'delivered':
        return 'text-gray-600'
      default:
        return 'text-gray-600'
    }
  }
  return 'text-gray-600'
})
</script>
