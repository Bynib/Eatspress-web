<script setup lang="ts">
import { Edit, Trash2 } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Menu } from '@/models/menu'
import { toBase64 } from '@/plugins/convert'

const categoryList = [
  { id: 1, type: 'Appetizer' },
  { id: 2, type: 'Main Course' },
  { id: 3, type: 'Dessert' },
  { id: 4, type: 'Beverage' },
]
const props = defineProps<{
  menuItem: Menu
}>()

console.log('item menu', props.menuItem)
defineEmits<{
  edit: [item_Id: number]
  delete: [item_Id: number]
}>()
</script>
<template>
  <Card class="w-[348px] h-[420px] shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
    <CardHeader>
      <!-- Menu Item Image -->
      <img
        :src="toBase64(menuItem.image as string)"
        :alt="menuItem.name"
        class="w-full h-48 rounded-md object-cover"
      />

      <!-- Menu Item Name and Category -->
      <div class="flex justify-between items-center">
        <CardTitle class="text-lg">
          {{ menuItem.name }}
        </CardTitle>
        <div
          class="bg-[#E5E7EB] rounded-full px-2 py-1 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]"
        >
          <span class="text-gray-500 text-sm font-normal">
            {{ categoryList.find((item) => item.id === menuItem.category_Id)?.type }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <CardDescription class="text-sm">
        {{ menuItem.description }}
      </CardDescription>
    </CardHeader>

    <CardContent class="flex items-center">
      <!-- Price -->
      <p class="font-bold text-xl">₱{{ menuItem.price }}</p>
    </CardContent>

    <CardFooter class="flex justify-end items-center">
      <!-- Action Buttons -->
      <div class="flex items-center gap-2">
        <!-- Edit Button -->

        <button
          @click="$emit('edit', menuItem.item_Id)"
          class="w-8 h-8 cursor-pointer p-2 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Edit class="w-3 h-3 text-blue-600" />
        </button>

        <!-- Delete Button -->
        <button
          @click="$emit('delete', menuItem.item_Id)"
          class="w-8 h-8 cursor-pointer p-2 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Trash2 class="w-3 h-3 text-red-600" />
        </button>
      </div>
    </CardFooter>
  </Card>
</template>
