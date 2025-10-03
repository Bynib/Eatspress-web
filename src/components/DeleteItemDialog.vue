<script setup lang="ts">
import { Trash2, TriangleAlert } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  status: 'Available' | 'Unavailable'
}

const props = defineProps<{
  isOpen: boolean
  menuItem: MenuItem | null
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'confirm-delete': [id: number]
}>()

const handleOpenChange = (open: boolean) => {
  emit('update:isOpen', open)
}

const handleCancel = () => {
  emit('update:isOpen', false)
}

const handleConfirmDelete = () => {
  if (props.menuItem) {
    emit('confirm-delete', props.menuItem.id)
  }
  emit('update:isOpen', false)
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="max-w-md w-full h-auto p-0 bg-transparent border-0 shadow-none">
      <div class="w-full px-8 py-6 bg-gray-200 rounded-3xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)]">
        <div class="w-full flex flex-col justify-center items-center gap-6">
          <!-- Warning Icon -->
          <div class="w-11 h-11 p-2 bg-gray-200 rounded-full shadow-[inset_-4px_-4px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] flex justify-center items-center">
            <TriangleAlert class="w-5 h-5 text-red-400" />
          </div>
          
          <!-- Title -->
          <div class="text-center text-gray-800 text-base font-bold leading-tight">Delete Menu Item</div>
          
          <!-- Description -->
          <div class="text-center text-gray-800 text-sm font-normal leading-tight">
            Are you sure you want to delete 
            <span class="font-bold">"{{ menuItem?.name || 'this item' }}"</span>?<br/>
            This action cannot be undone and will permanently remove this item from your menu.
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-center items-center gap-3.5">
            <!-- Cancel Button -->
            <button
              @click="handleCancel"
              class="w-36 px-8 py-2 bg-gray-200 rounded-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] hover:bg-gray-100 transition-colors"
            >
              <div class="text-center text-gray-800 text-sm font-semibold leading-tight">Cancel</div>
            </button>
            
            <!-- Delete Button -->
            <button
              @click="handleConfirmDelete"
              class="w-36 px-8 py-2 bg-gray-200 rounded-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 class="w-4 h-4 text-red-400" />
              <div class="text-center text-red-400 text-sm font-semibold leading-tight">Delete</div>
            </button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
