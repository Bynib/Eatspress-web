<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminMetrics from '@/components/AdminMetrics.vue'
import TabToggle from '@/components/TabToggle.vue'
import OrderCard from '@/components/OrderCard.vue'

// Types
type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customerName: string
  email: string
  date: string
  time: string
  items: OrderItem[]
  specialInstructions: string
  status: OrderStatus
  totalPrice: number
}

// Router
const router = useRouter()

// State
const activeTab = ref('orders')
const searchQuery = ref('')
const statusFilter = ref('')

// Sample data
const orders = ref<Order[]>([
  {
    id: '1',
    customerName: 'Rimar Navaja',
    email: 'rimar12311231@gmail.com',
    date: new Date().toDateString(), // Today's date
    time: '7:02 AM',
    items: [
      { name: 'Kaldereta', quantity: 1, price: 300 }
    ],
    specialInstructions: '23 12312312312312',
    status: 'pending',
    totalPrice: 300
  },
  {
    id: '2',
    customerName: 'Maria Santos',
    email: 'maria.santos@gmail.com',
    date: new Date().toDateString(), // Today's date
    time: '8:15 AM',
    items: [
      { name: 'Pork Humba', quantity: 1, price: 240 },
      { name: 'Kaldereta', quantity: 1, price: 300 }
    ],
    specialInstructions: '',
    status: 'ready',
    totalPrice: 540
  },
  {
    id: '3',
    customerName: 'Juan Dela Cruz',
    email: 'juan.delacruz@gmail.com',
    date: new Date(Date.now() - 86400000).toDateString(), // Yesterday
    time: '6:30 PM',
    items: [
      { name: 'Chicken Adobo', quantity: 2, price: 280 }
    ],
    specialInstructions: 'Extra spicy',
    status: 'delivered',
    totalPrice: 560
  },
  {
    id: '4',
    customerName: 'Ana Garcia',
    email: 'ana.garcia@gmail.com',
    date: new Date().toDateString(), // Today's date
    time: '12:45 PM',
    items: [
      { name: 'Sinigang', quantity: 1, price: 250 }
    ],
    specialInstructions: 'Less sour',
    status: 'preparing',
    totalPrice: 250
  }
])

// Computed properties
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = !searchQuery.value || 
      order.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || order.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

// Methods
const handleTabChange = (tab: 'menu' | 'orders') => {
  activeTab.value = tab
  if (tab === 'menu') {
    router.push('/admin/menu')
  }
}

const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = newStatus
  }
}

onMounted(() => {
  console.log('Admin Orders Dashboard loaded')
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
        <AdminMetrics 
          :orders="orders"
          type="orders"
        />
        
        <!-- Tab Toggle -->
        <div class="flex justify-center mb-8">
          <TabToggle 
            :active-tab="activeTab" 
            @tab-change="handleTabChange" 
          />
        </div>
        
        <!-- Orders List -->
        <div class="grid grid-cols-1 gap-6">
          <OrderCard
            v-for="order in filteredOrders"
            :key="order.id"
            :order="order"
            @status-change="updateOrderStatus"
          />
        </div>
      </div>
    </div>
  </div>
</template>

