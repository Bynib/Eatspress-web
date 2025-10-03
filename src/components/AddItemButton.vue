<template>
  <button 
    @click="$emit('click')"
    class="w-36 h-10 bg-gray-200 rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
  >
    <Plus class="w-4 h-4 text-red-400" />
    <span class="text-red-400 text-sm font-semibold font-['Segoe_UI'] leading-tight">
      Add Item
    </span>
  </button>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineEmits<{
  click: []
}>()
</script>
