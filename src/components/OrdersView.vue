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
</script>

<template>
  <Card class="w-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
    <CardHeader>
      <CardTitle class="flex gap-2 justify-between">
        <div class="flex gap-2 items-center">
          <component :is="statuses[0].icon" class="size-5" />
          <p class="font-semibold">Status</p>
        </div>
        <p class="font-bold">₱300</p>
      </CardTitle>
      <CardDescription>Order placed on Agust 23, 2025 7:02 AM</CardDescription>
    </CardHeader>
    <CardContent class="flex justify-between">
      <div class="text-sm lg:text-md gap-3 w-full flex flex-col rounded-2xl">
        <div class="w-full px-0 sm:px-0 md:px-5 flex justify-between">
          <div
            v-for="status in statuses"
            key="status.id"
            class="flex flex-col justify-center items-center"
          >
            <Button
              class="cursor-pointer p-2 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
            >
              <component :is="status.icon" class="size-5 text-[#FF6B6B]" />
            </Button>
            <p>{{ status.name }}</p>
          </div>
        </div>
        <Separator class="my-3" />
        <p>Order Items:</p>

        <!-- to be looped for items -->
        <div class="w-full flex gap-3 justify-between">
          <p>Kaldereta x 1</p>
          <p>₱300</p>
        </div>

        <p class="font-semibold">Special Instructions:</p>
        <Textarea
          disabled
          class="rounded-md bg-[#F8FAFC] p-3 w-full text-sm resize-none border-none focus:border-none focus:outline-none focus-visible:ring-0 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          placeholder="Make slices smaller."
        ></Textarea>
      </div>
    </CardContent>
    <CardFooter class="flex justify-center text-xs text-[#6B7280]">
      <p>Estimated delivery: 3:33 PM</p>
    </CardFooter>
  </Card>
</template>
