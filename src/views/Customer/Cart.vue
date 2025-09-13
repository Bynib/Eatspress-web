<script lang="ts" setup>
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import { ref } from 'vue'
const quantity = ref(1)

const adjustQuantity = (action: string) => {
  if (action === 'add') quantity.value++
  else if (quantity.value > 0) quantity.value--
}
</script>
<template>
  <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
    <div
      class="w-9/10 sm:w-9/10 md:w-9/10 lg:w-2/3 xl:w-2/3 2xl:w-1/2 flex flex-col justify-center items-center gap-5"
    >
      <div class="p-5 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
        <ShoppingCart class="text-[#FF6B6B]" />
      </div>
      <p class="text-2xl md:text-4xl font-extrabold">Your Cart</p>
      <p class="text-center text-sm">1 item • ₱300</p>
      <div
        class="p-5 w-full flex justify-between rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
      >
        <!-- cart items -->
        <div class="flex items-center w-1/2 gap-3">
          <img src="@/assets/kaldereta.png" alt="kaldereta" class="w-15 h-15" />
          <div class="flex flex-col w-1/2 md:w-full">
            <p class="font-bold overflow-hidden text-ellipsis">Kaldereta</p>
            <p class="text-xs">₱300 each</p>
          </div>
        </div>
        <div class="flex w-1/3 lg:w-1/2 gap-1 md:gap-3 items-center justify-end">
          <Button
            @click="adjustQuantity('minus')"
            class="cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
            ><Minus
          /></Button>
          <input v-model="quantity" class="w-5 md:w-10 text-center" disabled />
          <Button
            @click="adjustQuantity('add')"
            class="cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] text-[#FF6B6B]"
            ><Plus
          /></Button>
          <Button
            class="cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] text-[#FF6B6B]"
            ><Trash2
          /></Button>
          <!-- adjust price depending on quantity -->
          <p class="text-md md:text-lg font-bold">₱300</p>
        </div>
      </div>
      <div
        class="text-sm lg:text-md gap-3 p-5 w-full flex flex-col rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
      >
        <p class="font-semibold">Special Instructions</p>
        <Textarea
          class="bg-[#F8FAFC] w-full text-sm resize-none border-none focus:border-none focus:outline-none focus-visible:ring-0 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          placeholder="Any special requests or dietary requirements?"
        ></Textarea>
      </div>

      <div
        class="text-sm lg:text-md gap-5 p-5 w-full flex flex-col rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
      >
        <div class="flex justify-between">
          <p>Subtotal</p>
          <p>₱300</p>
        </div>
        <div class="flex justify-between">
          <p>Delivery Fee</p>
          <p>₱9</p>
        </div>
        <div class="flex justify-between text-lg">
          <p class="font-bold">Total</p>
          <p class="font-bold">₱309</p>
        </div>
        <Button
          class="cursor-pointer h-15 font-bold text-[#FF6B6B] rounded-lg shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
          ><p>Place Order</p>
          <ArrowRight />
        </Button>
      </div>
    </div>
  </div>
</template>
