<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminHeader from '@/components/AdminHeader.vue'
import MetricCard from '@/components/MetricCard.vue'
import TabToggle from '@/components/TabToggle.vue'
import MenuCard from '@/components/MenuCard.vue'
import AddItemButton from '@/components/AddItemButton.vue'
import AddItem from '@/views/Admin/AddItem.vue'
import DeleteItemDialog from '@/components/DeleteItemDialog.vue'
import kalderetaImage from '@/assets/kaldereta.png'
import { 
  PhilippinePeso, 
  Clock, 
  CheckCircle, 
  Menu 
} from 'lucide-vue-next'

const router = useRouter()

// Active tab state
const activeTab = ref<'menu' | 'orders'>('menu')

// Dialog state
const isAddItemOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const itemToDelete = ref<any>(null)

// Sample data
const menuItems = ref([
  {
    id: 1,
    name: 'Kaldereta',
    description: 'Beef stew cooked with tomato sauce and liver spread.',
    price: 300,
    category: 'mains',
    image: kalderetaImage,
    status: 'Available' as const
  },
  {
    id: 2,
    name: 'Pork Humba',
    description: 'Tender pork belly braised in soy sauce and vinegar.',
    price: 240,
    category: 'mains',
    image: kalderetaImage,
    status: 'Available' as const
  },
  {
    id: 3,
    name: 'Chicken Adobo',
    description: 'Classic Filipino chicken cooked in soy sauce and vinegar.',
    price: 280,
    category: 'mains',
    image: kalderetaImage,
    status: 'Available' as const
  }
])

// Computed properties for metrics
const totalRevenue = computed(() => 10121.94)
const pendingOrders = computed(() => 2)
const todaysOrders = computed(() => 0)

// Methods
const handleTabChange = (tab: 'menu' | 'orders') => {
  activeTab.value = tab
  if (tab === 'orders') {
    router.push('/admin')
  }
}

const handleAddItem = () => {
  isAddItemOpen.value = true
}

const handleAddItemSubmit = (item: any) => {
  // Add new item to menuItems array
  const newItem = {
    id: menuItems.value.length + 1,
    name: item.name,
    description: item.description,
    price: parseFloat(item.price),
    category: item.category,
    image: item.image ? URL.createObjectURL(item.image) : 'https://placehold.co/300x192',
    status: 'Available' as const
  }
  menuItems.value.push(newItem)
  console.log('New item added:', newItem)
}

const handleEditItem = (id: number) => {
  // TODO: Implement edit item functionality
  console.log('Edit item:', id)
}

const handleDeleteItem = (id: number) => {
  const item = menuItems.value.find(item => item.id === id)
  if (item) {
    itemToDelete.value = item
    isDeleteDialogOpen.value = true
  }
}

const handleConfirmDelete = (id: number) => {
  const index = menuItems.value.findIndex(item => item.id === id)
  if (index > -1) {
    menuItems.value.splice(index, 1)
    console.log('Item deleted:', id)
  }
  isDeleteDialogOpen.value = false
  itemToDelete.value = null
}

const formatCurrency = (amount: number) => {
  return `₱${amount.toFixed(2)}`
}

onMounted(() => {
  // Initialize component
})
</script>

<template>
  <div class="min-h-screen w-full bg-gray-200">
    <!-- Header -->
    <AdminHeader 
      :active-tab="activeTab" 
      @tab-change="handleTabChange" 
    />
    
    <!-- Main Content -->
    <div class="w-full bg-gray-200 pt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Dashboard Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p class="text-gray-600 text-base">
            Manage your restaurant operations
          </p>
        </div>
        
        <!-- Metrics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            :value="formatCurrency(totalRevenue)"
            :icon="PhilippinePeso"
            icon-class="text-green-600"
          />
          <MetricCard
            title="Pending Orders"
            :value="pendingOrders"
            :icon="Clock"
            icon-class="text-yellow-600"
          />
          <MetricCard
            title="Today's Orders"
            :value="todaysOrders"
            :icon="CheckCircle"
            icon-class="text-blue-600"
          />
          <MetricCard
            title="Menu Items"
            :value="menuItems.length"
            :icon="Menu"
            icon-class="text-purple-600"
          />
        </div>
        
        <!-- Tab Toggle -->
        <div class="flex justify-center mb-8">
          <TabToggle 
            :active-tab="activeTab" 
            @tab-change="handleTabChange" 
          />
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
              v-for="item in menuItems"
              :key="item.id"
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
    
    <!-- Delete Item Dialog -->
    <DeleteItemDialog
      :is-open="isDeleteDialogOpen"
      :menu-item="itemToDelete"
      @update:is-open="isDeleteDialogOpen = $event"
      @confirm-delete="handleConfirmDelete"
    />
  </div>
</template>

