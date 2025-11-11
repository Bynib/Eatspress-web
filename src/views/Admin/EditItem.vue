<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Edit } from 'lucide-vue-next'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import type { Menu } from '@/models/menu'

const props = defineProps<{
  isOpen: boolean
  menuItem: Menu
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'update-item': [id: number, item: Partial<Menu>]
}>()

const form = reactive<Partial<Menu>>({
  item_Id: 0,
  name: '',
  description: '',
  prep_Time: 0,
  category_Id: 0,
  price: 0,
  image: null,
})
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)

// Watch for menuItem changes
watch(
  () => props.menuItem,
  (newItem) => {
    if (newItem) {
      form.item_Id = newItem.item_Id
      form.name = newItem.name
      form.price = newItem.price
      form.description = newItem.description
      form.category_Id = newItem.category_Id
      form.prep_Time = newItem.prep_Time
      form.image = null
      selectedFile.value = null
    }
  },
  { immediate: true },
)

const handleChooseFile = () => {
  fileInput.value?.click()
}

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
  if (props.menuItem) {
    emit('update-item', props.menuItem.item_Id, { ...form })
    handleCancel()
  }
}

const handleCancel = () => {
  form.name = ''
  form.price = 0
  form.description = ''
  form.category_Id = 0
  form.prep_Time = 0
  form.image = null
  selectedFile.value = null
  emit('update:isOpen', false)
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleOpenChange">
    <DialogContent class="max-w-6xl w-full h-auto p-0 bg-transparent border-0 shadow-none">
      <div
        class="w-full px-8 py-6 bg-gray-200 rounded-3xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)]"
      >
        <div class="w-full space-y-6">
          <!-- Title -->
          <div class="text-center text-gray-800 text-xl font-bold leading-7">Edit Menu Item</div>

          <!-- Name & Price -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight">Name</label>
              <div
                class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]"
              >
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter item name"
                  class="w-full h-5 bg-transparent border-0 outline-none text-gray-800 text-sm font-normal leading-tight"
                  required
                />
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight">Price</label>
              <div
                class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]"
              >
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

          <!-- Description -->
          <div class="space-y-1">
            <label class="block text-gray-800 text-xs font-semibold leading-tight"
              >Description</label
            >
            <div
              class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]"
            >
              <textarea
                v-model="form.description"
                placeholder="Enter item description"
                rows="4"
                class="w-full h-24 bg-transparent border-0 outline-none text-gray-800 text-sm font-normal leading-tight resize-none"
                required
              />
            </div>
          </div>

          <!-- Category & Prep Time -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight"
                >Category</label
              >
              <div class="relative">
                <select
                  v-model="form.category_Id"
                  class="cursor-pointer w-full h-9 px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] text-gray-800 text-sm font-normal leading-tight appearance-none border-0 outline-none"
                  required
                >
                  <option value="">Select category</option>
                  <option value="1">Appetizer</option>
                  <option value="2">Main Course</option>
                  <option value="3">Dessert</option>
                  <option value="4">Beverage</option>
                </select>
                <div
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                >
                  <div
                    class="w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-600"
                  ></div>
                </div>
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-gray-800 text-xs font-semibold leading-tight"
                >Prep Time (min)</label
              >
              <div
                class="px-3 py-2 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)]"
              >
                <input
                  v-model="form.prep_Time"
                  type="number"
                  placeholder="15"
                  class="w-full h-5 bg-transparent border-0 outline-none text-gray-800 text-sm font-normal leading-tight"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Upload Image -->
          <div class="space-y-1">
            <label class="block text-gray-800 text-xs font-semibold leading-tight"
              >Upload image</label
            >
            <div class="flex">
              <button
                type="button"
                @click="handleChooseFile"
                class="px-3 py-2 bg-gray-200 rounded-l-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] text-gray-800 text-xs font-normal leading-tight hover:bg-gray-100 transition-colors"
              >
                Choose File
              </button>
              <div
                class="flex-1 px-3 py-2 bg-gray-200 rounded-r-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] flex items-center"
              >
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
              class="cursor-pointer px-6 py-2 bg-gray-200 rounded-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] text-gray-800 text-sm font-semibold leading-tight hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              @click="handleSubmit"
              class="cursor-pointer px-6 py-2 bg-gray-200 rounded-xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] text-blue-600 text-sm font-semibold leading-tight hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <Edit class="w-4 h-4" />
              Update Item
            </button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
