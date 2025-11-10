<template>
  <div
    class="w-full px-7 py-5 bg-gray-200 rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] flex flex-col gap-5">
    <!-- Order Header -->
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-3.5">
        <!-- Customer Name and Total Price -->
        <div class="flex justify-between items-center">
          <div class="text-gray-800 text-base font-bold leading-normal">{{ user?.firstname + " " + user?.lastname }}
          </div>
          <div class="text-gray-800 text-2xl font-bold leading-loose">₱{{ total }}</div>
        </div>

        <!-- Email, Date, and Status Buttons -->
        <div class="flex justify-between items-start">
          <div class="flex flex-col gap-1">
            <div class="text-gray-600 text-sm font-normal leading-tight">{{ user?.email }}</div>
            <div class="text-gray-500 text-sm font-normal leading-tight">{{ new
              Date(order.created_At!).toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              hour12: true
              }) }}</div>
          </div>
          <div class="flex items-center gap-3.5 flex-wrap">
            <StatusButton v-for="status in statuses" :key="status.id" :is-next="order.status_Id! + 1 === status.id" :status="status.name.toLowerCase()" :icon="status.icon"
              :is-active="order.status_Id === status.id" @click="$emit('status-change', order.order_Id!, status.id)" />
          </div>
        </div>
      </div>

      <!-- Items Section -->
      <div class="flex flex-col gap-2">
        <div class="text-gray-800 text-sm font-semibold leading-tight">Items:</div>
        <div v-for="item in order.details" :key="item.item_Id" class="flex justify-between items-center">
          <div class="flex items-center gap-2.5">
            <span class="text-gray-700 text-base font-normal leading-normal">{{ menu.items.find((i) => i.item_Id === item.item_Id)?.name }}</span>
            <span class="text-gray-700 text-base font-semibold leading-normal">x{{ item.quantity }}</span>
          </div>
          <div class="text-gray-800 text-base font-normal leading-loose">₱{{ menu.items.find((i) => i.item_Id === item.item_Id)?.price }}</div>
        </div>
      </div>
    </div>

    <!-- Special Instructions -->
    <div
      class="h-16 bg-gray-200 rounded-xl shadow-[inset_-8px_-8px_16px_0px_rgba(255,255,255,1.00)] shadow-[inset_8px_8px_16px_0px_rgba(190,190,190,1.00)] p-3 flex flex-col gap-1">
      <div class="text-gray-800 text-sm font-semibold leading-tight">Special Instructions:</div>
      <div class="text-gray-600 text-sm font-normal leading-tight">
        {{ order.instruction || 'No special instructions' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, } from 'vue'
import StatusButton from './StatusButton.vue'
import type { Order } from '@/models/order';
import { ChefHat, CircleCheckBig, Clock, Truck } from 'lucide-vue-next';
import { useMenuStore } from '@/stores/menu';
import { useUserStore } from '@/stores/user';

const props = defineProps<{
  order: Order
}>()

defineEmits<{
  'status-change': [orderId: number, status: number]
}>()



const statuses = [
  {
    id: 1,
    name: 'Pending',
    icon: Clock,
  },
  {
    id: 2,
    name: 'Preparing',
    icon: ChefHat,
  },
  {
    id: 3,
    name: 'Ready',
    icon: CircleCheckBig,
  },
  {
    id: 4,
    name: 'Delivered',
    icon: Truck,
  },
]
const menu = useMenuStore()
const users = useUserStore()
const user = users.users.find(u => u.user_Id === props.order.user_Id)
const total = computed(() => {
  //
  return props.order.details.reduce((sum, item) => {
    const menuItem = menu.items.find((i) => i.item_Id === item.item_Id)
    return sum + item.quantity * (menuItem?.price ?? 0)
  }, 9)
})
</script>
