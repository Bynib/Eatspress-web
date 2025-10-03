<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Plus } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface MenuItemForm {
  name: string
  price: string
  description: string
  category: string
  prepTime: string
  image: File | null
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'add-item': [item: MenuItemForm]
}>()

const form = reactive<MenuItemForm>({
  name: '',
  price: '',
  description: '',
  category: '',
  prepTime: '',
  image: null
})

const selectedFile = ref<File | null>(null)

const handleOpenChange = (open: boolean) => {
  emit('update:isOpen', open)
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
    form.image = target.files[0]
  }
}

const handleSubmit = () => {
  emit('add-item', { ...form })
  handleCancel()
}

const handleCancel = () => {
  // Reset form
  form.name = ''
  form.price = ''
  form.description = ''
  form.category = ''
  form.prepTime = ''
  form.image = null
  selectedFile.value = null
  
  emit('update:isOpen', false)
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="max-w-6xl w-full h-auto p-0 bg-transparent border-0 shadow-none">
      <div class="w-full px-8 py-6 bg-gray-200 rounded-3xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)]">
        <div class="w-full space-y-6">
          <!-- Title -->
          <div class="text-center text-gray-800 text-xl font-bold leading-7">Add Menu Item</div>
          
          <!-- Name and Price Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Name Field -->
            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight">Name</label>
              <div class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]">
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter item name"
                  class="w-full h-5 bg-transparent border-0 outline-none text-gray-800 text-sm font-normal leading-tight"
                  required
                />
              </div>
            </div>
            
            <!-- Price Field -->
            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight">Price</label>
              <div class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]">
                <input
                  v-model="form.price"
                  type="number"
                  placeholder="0.00"
                  class="w-full h-5 bg-transparent border-0 outline-none text-gray-800 text-sm font-normal leading-tight"
                  required
                />
              </div>
            </div>
          </div>
          
          <!-- Description Field -->
          <div class="space-y-1">
            <label class="block text-gray-800 text-xs font-semibold leading-tight">Description</label>
            <div class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]">
              <textarea
                v-model="form.description"
                placeholder="Enter item description"
                rows="4"
                class="w-full h-24 bg-transparent border-0 outline-none text-gray-800 text-sm font-normal leading-tight resize-none"
                required
              ></textarea>
            </div>
          </div>
          
          <!-- Category and Prep Time Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Category Field -->
            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight">Category</label>
              <div class="relative">
                <select
                  v-model="form.category"
                  class="w-full h-9 px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] text-gray-800 text-sm font-normal leading-tight bg-transparent border-0 outline-none appearance-none"
                  required
                >
                  <option value="">Select category</option>
                  <option value="mains">Main Course</option>
                  <option value="appetizers">Appetizers</option>
                  <option value="desserts">Desserts</option>
                  <option value="beverages">Beverages</option>
                </select>
                <!-- Custom dropdown arrow -->
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <div class="w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-600"></div>
                </div>
              </div>
            </div>
            
            <!-- Prep Time Field -->
            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight">Prep Time (min)</label>
              <div class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]">
                <input
                  v-model="form.prepTime"
                  type="number"
                  placeholder="15"
                  class="w-full h-5 bg-transparent border-0 outline-none text-gray-800 text-sm font-normal leading-tight"
                  required
                />
              </div>
            </div>
          </div>
          
          <!-- Upload Image Field -->
          <div class="space-y-1">
            <label class="block text-gray-800 text-xs font-semibold leading-tight">Upload image</label>
            <div class="flex">
              <button
                type="button"
                @click="$refs.fileInput.click()"
                class="px-3 py-2 bg-gray-200 rounded-l-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] text-gray-800 text-xs font-normal leading-tight hover:bg-gray-100 transition-colors"
              >
                Choose File
              </button>
              <div class="flex-1 px-3 py-2 bg-gray-200 rounded-r-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] flex items-center">
                <span class="text-gray-800/40 text-xs font-normal leading-tight truncate">
                  {{ selectedFile ? selectedFile.name : 'No file chosen' }}
                </span>
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="hidden"
            />
          </div>
          <!-- Action Buttons -->
          <div class="flex justify-end gap-4 pt-4">
            <button
              type="button"
              @click="handleCancel"
              class="px-6 py-2 bg-gray-200 rounded-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] text-gray-800 text-sm font-semibold leading-tight hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              @click="handleSubmit"
              class="px-6 py-2 bg-gray-200 rounded-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] text-red-400 text-sm font-semibold leading-tight hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <div class="w-4 h-4 relative">
                <div class="w-2.5 h-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-t border-red-400"></div>
                <div class="w-0 h-2.5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-l border-red-400"></div>
              </div>
              Add Item
            </button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

