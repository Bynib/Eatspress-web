<template>
  <div class="w-full px-7 py-5 bg-gray-200 rounded-2xl shadow-[-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[8px_8px_16px_0px_rgba(190,190,190,1.00)] flex flex-col gap-5">
    <!-- Order Header -->
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-3.5">
        <!-- Customer Name and Total Price -->
        <div class="flex justify-between items-center">
          <div class="text-gray-800 text-base font-bold leading-normal">{{ order.customerName }}</div>
          <div class="text-gray-800 text-2xl font-bold leading-loose">₱{{ order.totalPrice }}</div>
        </div>
        
        <!-- Email, Date, and Status Buttons -->
        <div class="flex justify-between items-start">
          <div class="flex flex-col gap-1">
            <div class="text-gray-600 text-sm font-normal leading-tight">{{ order.email }}</div>
            <div class="text-gray-500 text-sm font-normal leading-tight">{{ formatDate(order.date, order.time) }}</div>
          </div>
          <div class="flex items-center gap-3.5 flex-wrap">
            <StatusButton
              v-for="status in statusOptions"
              :key="status"
              :status="status"
              :is-active="order.status === status"
              @click="$emit('status-change', order.id, status)"
            />
          </div>
        </div>
      </div>
      
      <!-- Items Section -->
      <div class="flex flex-col gap-2">
        <div class="text-gray-800 text-sm font-semibold leading-tight">Items:</div>
        <div 
          v-for="item in order.items" 
          :key="`${order.id}-${item.name}`"
          class="flex justify-between items-center"
        >
          <div class="flex items-center gap-2.5">
            <span class="text-gray-700 text-base font-normal leading-normal">{{ item.name }}</span>
            <span class="text-gray-700 text-base font-semibold leading-normal">x{{ item.quantity }}</span>
          </div>
          <div class="text-gray-800 text-base font-normal leading-loose">₱{{ item.price }}</div>
        </div>
      </div>
    </div>
    
    <!-- Special Instructions -->
    <div class="h-16 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] p-3 flex flex-col gap-1">
      <div class="text-gray-800 text-sm font-semibold leading-tight">Special Instructions:</div>
      <div class="text-gray-600 text-sm font-normal leading-tight">
        {{ order.specialInstructions || 'No special instructions' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import StatusButton from './StatusButton.vue'

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
  status: 'pending' | 'preparing' | 'ready' | 'delivered'
  totalPrice: number
}

const props = defineProps<{
  order: Order
}>()

defineEmits<{
  'status-change': [orderId: string, status: 'pending' | 'preparing' | 'ready' | 'delivered']
}>()

const statusOptions = ['pending', 'preparing', 'ready', 'delivered'] as const

const formatDate = (date: string, time: string) => {
  return `${date} ${time}`
}
</script>
