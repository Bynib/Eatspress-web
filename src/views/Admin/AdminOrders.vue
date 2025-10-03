<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PhilippinePeso, Clock, CheckCircle, Menu } from 'lucide-vue-next'
import AdminHeader from '@/components/AdminHeader.vue'
import MetricCard from '@/components/MetricCard.vue'
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
    date: 'August 23rd, 2025',
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
    customerName: 'Rimar Navaja',
    email: 'rimar12311231@gmail.com',
    date: 'August 23rd, 2025',
    time: '7:02 AM',
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
    customerName: 'Rimar Navaja',
    email: 'rimar12311231@gmail.com',
    date: 'August 23rd, 2025',
    time: '7:02 AM',
    items: [
      { name: 'Kaldereta', quantity: 1, price: 300 }
    ],
    specialInstructions: '23 12312312312312',
    status: 'pending',
    totalPrice: 300
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

const totalRevenue = computed(() => {
  return orders.value.reduce((sum, order) => sum + order.totalPrice, 0)
})

const pendingOrders = computed(() => {
  return orders.value.filter(order => order.status === 'pending').length
})

const todaysOrders = computed(() => {
  const today = new Date().toDateString()
  return orders.value.filter(order => {
    const orderDate = new Date(order.date).toDateString()
    return orderDate === today
  }).length
})

const menuItems = computed(() => {
  const uniqueItems = new Set()
  orders.value.forEach(order => {
    order.items.forEach(item => uniqueItems.add(item.name))
  })
  return uniqueItems.size
})

// Methods
const handleTabChange = (tab: string) => {
  activeTab.value = tab
}

const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
  const order = orders.value.find(o => o.id === orderId)
  if (order) {
    order.status = newStatus
  }
}

const formatCurrency = (amount: number) => {
  return `₱${amount.toLocaleString()}`
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
            :value="menuItems"
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

