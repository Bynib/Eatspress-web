<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Clock, ChefHat, CircleCheckBig, Truck } from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import type { Order } from '@/models/order'
import { computed } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useAddressStore } from '@/stores/address'

interface Props {
  item: Order
}
const props = defineProps<Props>()
const menu = useMenuStore()
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
const total = computed(() => {
  //
  return props.item.details.reduce((sum, item) => {
    const menuItem = menu.items.find((i) => i.item_Id === item.item_Id)
    return sum + item.quantity * (menuItem?.price ?? 0)
  }, 9)
})
console.log('itemprop', props.item)
const address = useAddressStore()
const a = computed(() => address.addresses.find((a) => a.address_Id === props.item.address_Id))
</script>

<template>
  <Card class="w-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
    <CardHeader>
      <CardTitle class="flex gap-2 justify-between">
        <div class="flex gap-2 items-center">
          <component :is="statuses[item.status_Id! - 1].icon" class="size-5" />
          <p class="font-semibold">{{ statuses[item.status_Id! - 1].name }}</p>
        </div>
        <p class="font-bold">₱{{ total }}</p>
      </CardTitle>
      <CardDescription
        >Order placed on
        {{
          new Date(item.created_At!).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
        }}</CardDescription
      >
    </CardHeader>
    <CardContent class="flex justify-between">
      <div class="text-sm lg:text-md gap-3 w-full flex flex-col rounded-2xl">
        <div class="w-full px-0 sm:px-0 md:px-5 flex justify-between">
          <div
            v-for="status in statuses"
            :key="status.id"
            class="flex flex-col justify-center items-center"
          >
            <Button
              class="p-2 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
              :class="status.id === item.status_Id ? 'bg-[#FF6B6B]' : ''"
            >
              <component
                :is="status.icon"
                class="size-5"
                :class="status.id === item.status_Id ? 'text-white' : 'text-gray-600'"
              />
            </Button>
            <p>{{ status.name }}</p>
          </div>
        </div>
        <Separator class="my-3" />
        <p>Order Items:</p>

        <!-- to be looped for items -->
        <div
          v-for="(item, index) in item.details"
          :key="index"
          class="w-full flex gap-3 justify-between"
        >
          <p>
            {{ menu.items.find((i) => i.item_Id === item.item_Id)?.name }} x {{ item.quantity }}
          </p>
          <p>
            ₱{{ item.quantity * (menu.items.find((i) => i.item_Id === item.item_Id)?.price ?? 0) }}
          </p>
        </div>

        <p class="italic">
          Deliver to: {{ a?.unit_No }}, {{ a?.street }}, {{ a?.barangay }}, {{ a?.city }},
          {{ a?.zip_Code }}
        </p>
        <p class="font-semibold">Special Instructions:</p>
        <Textarea
          disabled
          :value="item.instruction"
          class="rounded-md bg-[#F8FAFC] p-3 w-full text-sm resize-none border-none focus:border-none focus:outline-none focus-visible:ring-0 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          placeholder="No special instructions."
        ></Textarea>
      </div>
    </CardContent>
    <CardFooter class="flex justify-center text-xs text-[#6B7280]">
      <p>Estimated delivery: 3:33 PM</p>
    </CardFooter>
  </Card>
</template>
