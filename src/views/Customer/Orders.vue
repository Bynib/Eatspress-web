<script lang="ts" setup>
import OrdersView from '@/components/OrdersView.vue'
import { onBeforeMount, ref } from 'vue'
import { Clock, ChefHat, CircleCheckBig, Truck } from 'lucide-vue-next'
import { useOrderStore } from '@/stores/order'
import { useAuthStore } from '@/stores/auth'

const activeFilter = ref('All')
const order = useOrderStore()
const changeFilter = (filterOrder: string) => {
  activeFilter.value = filterOrder
}

const filters = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Pending',
    icon: Clock,
  },
  {
    id: 3,
    name: 'Preparing',
    icon: ChefHat,
  },
  {
    id: 4,
    name: 'Ready',
    icon: CircleCheckBig,
  },
  {
    id: 5,
    name: 'Delivered',
    icon: Truck,
  },
]

onBeforeMount(async () => {
  const { user } = useAuthStore()
  await order.getByUser(user.user_Id)
  await menu.getAll()
})
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
    <div
      class="w-9/10 sm:w-9/10 md:w-9/10 lg:w-2/3 xl:w-3/4 2xl:w-1/2 flex flex-col justify-center items-center gap-5"
    >
      <p
        class="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text h-11 text-transparent"
      >
        Order Tracking
      </p>
      <p class="text-center text-sm">Track your delicious orders in real-time.</p>
    </div>
    <div
      class="w-3/4 sm:w-9/10 md:w-9/10 lg:w-full xl:w-full 2xl:w-full flex flex-wrap gap-5 justify-center items-center"
    >
      <div v-for="filter in filters" key="filter.id">
        <Button
          :class="[
            'transition-all duration-300 ease-in-out cursor-pointer flex gap-2 rounded-full py-2 px-5',
            activeFilter === filter.name
              ? 'bg-gradient-to-r from-rose-500 to-orange-500 font-bold text-white'
              : 'text-[#4B5563] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]',
          ]"
          @click="changeFilter(filter.name)"
        >
          <component :is="filter.icon" />
          {{ filter.name }}
        </Button>
      </div>
    </div>
    <div
      class="mb-10 w-9/10 sm:w-9/10 md:w-4/5 lg:w-3/5 xl:w-3/5 2xl:w-4/9 grid grid-cols-1 gap-5 justify-center items-center"
    >
      <OrdersView v-for="order in order.orders" :key="order.order_Id" :item="order" />
    </div>
  </div>
</template>
