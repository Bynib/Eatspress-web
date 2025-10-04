<script setup lang="ts">
import { computed } from 'vue'
import { PhilippinePeso, Clock, CheckCircle, Menu as Menu2 } from 'lucide-vue-next'
import MetricCard from '@/components/MetricCard.vue'
import type { Menu } from '@/models/menu'

interface Order {
  id: string
  customerName: string
  email: string
  date: string
  time: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  specialInstructions: string
  status: 'pending' | 'preparing' | 'ready' | 'delivered'
  totalPrice: number
}

const props = defineProps<{
  orders?: Order[]
  menuItems?: Menu[]
  type: 'orders' | 'menu'
}>()

// Computed properties for orders metrics
const ordersTotalRevenue = computed(() => {
  if (!props.orders) return 0
  return props.orders.reduce((sum, order) => sum + order.totalPrice, 0)
})

const ordersPendingOrders = computed(() => {
  if (!props.orders) return 0
  return props.orders.filter((order) => order.status === 'pending').length
})

const ordersTodaysOrders = computed(() => {
  if (!props.orders) return 0
  const today = new Date().toDateString()
  return props.orders.filter((order) => order.date === today).length
})

const ordersMenuItems = computed(() => {
  if (!props.orders) return 0
  const uniqueItems = new Set()
  props.orders.forEach((order) => {
    order.items.forEach((item) => uniqueItems.add(item.name))
  })
  return uniqueItems.size
})

// Computed properties for menu metrics
const menuTotalRevenue = computed(() => {
  if (!props.menuItems) return 0
  return props.menuItems.reduce((sum, item) => sum + item.price, 0)
})

const menuPendingOrders = computed(() => {
  if (!props.menuItems) return 0
  return props.menuItems.length
})

const menuTodaysOrders = computed(() => {
  if (!props.menuItems) return 0
  return props.menuItems.length
})

const menuMenuItems = computed(() => {
  if (!props.menuItems) return 0
  return props.menuItems.length
})

// Get the appropriate metrics based on type
const totalRevenue = computed(() => {
  return props.type === 'orders' ? ordersTotalRevenue.value : menuTotalRevenue.value
})

const pendingOrders = computed(() => {
  return props.type === 'orders' ? ordersPendingOrders.value : menuPendingOrders.value
})

const todaysOrders = computed(() => {
  return props.type === 'orders' ? ordersTodaysOrders.value : menuTodaysOrders.value
})

const menuItems = computed(() => {
  return props.type === 'orders' ? ordersMenuItems.value : menuMenuItems.value
})

const formatCurrency = (amount: number) => {
  return `₱${amount.toLocaleString()}`
}

// Get appropriate titles based on type
const titles = computed(() => {
  if (props.type === 'orders') {
    return {
      revenue: 'Total Revenue',
      pending: 'Pending Orders',
      today: "Today's Orders",
      items: 'Menu Items',
    }
  } else {
    return {
      revenue: 'Potential Revenue',
      pending: 'Unavailable Items',
      today: 'Available Items',
      items: 'Total Menu Items',
    }
  }
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <MetricCard
      :title="titles.revenue"
      :value="formatCurrency(totalRevenue)"
      :icon="PhilippinePeso"
      icon-class="text-green-600"
    />
    <MetricCard
      :title="titles.pending"
      :value="pendingOrders"
      :icon="Clock"
      icon-class="text-yellow-600"
    />
    <MetricCard
      :title="titles.today"
      :value="todaysOrders"
      :icon="CheckCircle"
      icon-class="text-blue-600"
    />
    <MetricCard
      :title="titles.items"
      :value="menuItems"
      :icon="Menu2"
      icon-class="text-purple-600"
    />
  </div>
</template>
