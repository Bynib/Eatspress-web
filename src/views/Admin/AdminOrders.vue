<script setup lang="ts">
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import AdminHeader from '@/components/AdminHeader.vue'
import AdminMetrics from '@/components/AdminMetrics.vue'
import TabToggle from '@/components/TabToggle.vue'
import OrderCard from '@/components/OrderCard.vue'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import { useMenuStore } from '@/stores/menu'

// Router
const router = useRouter()

const order = useOrderStore()
const users = useUserStore()
const menu = useMenuStore()
// State
const activeTab = ref('orders')

onBeforeMount(async () => {
  await menu.getAll()
  await users.fetchAll()
  await order.getAll()

  console.log('orders', order.orders)
})

// Methods
const handleTabChange = (tab: string) => {
  activeTab.value = tab
  if (tab === 'menu') {
    router.push('/admin/menu')
  } else if (tab === 'orders') {
    router.push('/admin/orders')
  }
}

const updateOrderStatus = async (orderId: number, newStatus: number) => {
  await order.updateStatus(orderId, newStatus)
}

onMounted(() => {
  console.log('Admin Orders Dashboard loaded')
})
</script>

<template>
  <div class="min-h-screen w-full bg-gray-200">
    <!-- Header -->
    <AdminHeader :active-tab="activeTab" @tab-change="handleTabChange" />

    <!-- Main Content -->
    <div class="w-full bg-gray-200 pt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Dashboard Title -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p class="text-gray-600 text-base">Manage your restaurant operations</p>
        </div>

        <!-- Metrics Cards -->
        <AdminMetrics :orders="order.orders" type="orders" />

        <!-- Tab Toggle -->
        <div class="flex justify-center mb-8">
          <TabToggle :active-tab="activeTab" @tab-change="handleTabChange" />
        </div>

        <!-- Orders List -->
        <div class="grid grid-cols-1 gap-6 pb-10">
          <OrderCard
            v-for="order in order.orders"
            :key="order.order_Id"
            :order="order"
            @status-change="updateOrderStatus"
          />
        </div>
      </div>
    </div>
  </div>
</template>
