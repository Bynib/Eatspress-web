<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import router from '@/router'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminMetrics from '@/components/AdminMetrics.vue'
import TabToggle from '@/components/TabToggle.vue'
import MenuCard from '@/components/MenuCard.vue'
import AddItemButton from '@/components/AddItemButton.vue'
import AddItem from '@/views/Admin/AddItem.vue'
import EditItem from '@/views/Admin/EditItem.vue'
import DeleteItemDialog from '@/components/DeleteItemDialog.vue'
import kalderetaImage from '@/assets/kaldereta.png'
import { useMenuStore } from '@/stores/menu'
import type { Menu } from '@/models/menu'

const menu = useMenuStore()
// Active tab state
const activeTab = ref('menu')

// Dialog state
const isAddItemOpen = ref(false)
const isEditItemOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const itemToEdit = ref<Menu | null>(null)
const itemToDelete = ref<Menu | null>(null)

// Methods
const handleTabChange = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu') {
    router.push('/admin/menu')
  } else if (tab === 'orders') {
    router.push('/admin/orders')
  }
}

const handleAddItem = () => {
  isAddItemOpen.value = true
}

const handleAddItemSubmit = async (item: Partial<Menu>) => {
  // Add new item to menuItems array
  console.log('item', item)
  await menu.create(item)
  console.log('New item added:', item)
}

const handleEditItem = (item_Id: number) => {
  const item = menu.items.find((item) => item.item_Id === item_Id)
  console.log('teims', item)
  if (item) {
    itemToEdit.value = item
    isEditItemOpen.value = true
  }
}

const handleUpdateItem = async (item_Id: number, updatedItem: Partial<Menu>) => {
  const index = menu.items.findIndex((item) => item.item_Id === item_Id)
  if (index > -1) {
    // Update the item with new data
    menu.items[index] = {
      ...menu.items[index],
      name: updatedItem.name!,
      description: updatedItem.description!,
      price: updatedItem.price!,
      category_Id: updatedItem.category_Id!,
      image: updatedItem.image
        ? URL.createObjectURL(updatedItem.image! as Blob)
        : menu.items[index].image,
    }
    console.log('Item updated:', item_Id, updatedItem)
  }
  await menu.update(item_Id, updatedItem)
  isEditItemOpen.value = false
  itemToEdit.value = null
}

const handleDeleteItem = (item_Id: number) => {
  const item = menu.items.find((item) => item.item_Id === item_Id)
  if (item) {
    itemToDelete.value = item
    isDeleteDialogOpen.value = true
  }
}

const handleConfirmDelete = (item_Id: number) => {
  const index = menu.items.findIndex((item) => item.item_Id === item_Id)
  if (index > -1) {
    menu.items.splice(index, 1)
    console.log('Item deleted:', item_Id)
  }
  isDeleteDialogOpen.value = false
  itemToDelete.value = null
  menu.remove(item_Id)
}

onMounted(() => {
  // Initialize component
  menu.getAll()
})
</script>

<template>
  <div class="min-h-screen w-full bg-gray-200">
    <!-- Header -->
    <AdminHeader :active-tab="activeTab" @tab-change="handleTabChange" />

    <!-- Main Content -->
    <div class="w-full bg-gray-200 pt-8 mb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Dashboard Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p class="text-gray-600 text-base">Manage your restaurant operations</p>
        </div>

        <!-- Metrics Cards -->
        <AdminMetrics :menu-items="menu.items" type="menu" />

        <!-- Tab Toggle -->
        <div class="flex justify-center mb-8">
          <TabToggle :active-tab="activeTab" @tab-change="handleTabChange" />
        </div>

        <!-- Menu Management Section -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-gray-800">Menu Management</h2>
          <AddItemButton @click="handleAddItem" />
        </div>

        <!-- Menu Items Grid -->
        <div class="flex justify-center">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
            <MenuCard
              v-for="item in menu.items"
              :key="item.item_Id"
              :menu-item="item"
              @edit="handleEditItem"
              @delete="handleDeleteItem"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Add Item Dialog -->
    <AddItem
      :is-open="isAddItemOpen"
      @update:is-open="isAddItemOpen = $event"
      @add-item="handleAddItemSubmit"
    />

    <!-- Edit Item Dialog -->
    <EditItem
      :is-open="isEditItemOpen"
      :menu-item="itemToEdit!"
      @update:is-open="isEditItemOpen = $event"
      @update-item="handleUpdateItem"
    />

    <!-- Delete Item Dialog -->
    <DeleteItemDialog
      :is-open="isDeleteDialogOpen"
      :menu-item="itemToDelete!"
      @update:is-open="isDeleteDialogOpen = $event"
      @confirm-delete="handleConfirmDelete"
    />
  </div>
</template>
