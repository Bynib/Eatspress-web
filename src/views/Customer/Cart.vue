<script lang="ts" setup>
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import Textarea from '@/components/ui/textarea/Textarea.vue'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useMenuStore } from '@/stores/menu'
import { useAddressStore } from '@/stores/address'
import { toBase64 } from '@/plugins/convert'
import { useAuthStore } from '@/stores/auth'
import { useSonnerStore } from '@/stores/sonner'
import type { Order, OrderDetail } from '@/models/order'
import { useOrderStore } from '@/stores/order'

const menu = useMenuStore()
const cart = useCartStore()
const order = useOrderStore()
const addressStore = useAddressStore()
const sonner = useSonnerStore()
const auth = useAuthStore()
const showDialog = ref(false)
const newAddr = ref({
  unit_No: '',
  street: '',
  barangay: '',
  city: '',
  zip_Code: 0,
})

const instruction = ref('')

onMounted(async () => {
  await menu.getAll()
  await cart.getUserCart()
  if (addressStore.addresses.length === 0 && addressStore.isLoading === false) {
    await addressStore.getByUser(auth.user?.user_Id ?? 0)
  }
})

const cartItems = computed(() =>
  cart.items.map((item) => {
    const menuItem = menu.items.find((m) => m.item_Id === item.item_Id)
    return { ...item, ...menuItem }
  }),
)

let timeoutId: number | null = null
const adjustQuantity = async (id: number, action: string) => {
  cart.items = cart.items.map((item) =>
    item.item_Id === id
      ? { ...item, quantity: action === 'add' ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
      : item,
  )
  const cartItem = cart.items.find((item) => item.item_Id === id)
  if (cartItem) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = window.setTimeout(async () => {
      await cart.updateCart(id, cartItem.quantity)
      timeoutId = null
    }, 500)
  }
}

const selectAddress = (id: number) => {
  addressStore.selectedAddress = addressStore.addresses.find((a) => a.address_Id === id) ?? null
}

const addAddress = async () => {
  if (
    !newAddr.value.unit_No ||
    !newAddr.value.street ||
    !newAddr.value.barangay ||
    !newAddr.value.city ||
    !newAddr.value.zip_Code
  )
    return sonner.error('All fields are required')

  await addressStore.create({ ...newAddr.value })
  Object.assign(newAddr.value, { unit_No: '', street: '', barangay: '', city: '', zip_Code: 0 })
  showDialog.value = false
}

const placeOrder = async () => {
  console.log('sele', addressStore.selectedAddress)
  console.log('cart', cart.items)
  const newOrder: Order = {
    user_Id: auth.user?.user_Id ?? 0,
    address_Id: addressStore.selectedAddress?.address_Id ?? 0,
    details: cart.items.map((item) => ({
      item_Id: item.item_Id,
      quantity: item.quantity,
    })) as OrderDetail[],
    instruction: instruction.value,
    estimated_Time: 15,
  }

  await order.placeOrder(newOrder)
}
</script>

<template>
  <div class="w-full flex flex-col gap-5 items-center">
    <div
      class="h-full w-9/10 sm:w-9/10 md:w-9/10 lg:w-2/3 xl:w-2/3 2xl:w-1/2 flex flex-col items-center gap-5"
    >
      <p
        class="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text h-11 text-transparent"
      >
        Your Cart
      </p>
      <p v-if="cartItems.length !== 0" class="text-center text-sm">
        {{ cartItems.length }} item<span>{{ cartItems.length > 1 ? 's' : '' }}</span> • ₱300
      </p>

      <div
        v-if="cartItems.length === 0"
        class="text-gray-500 pt-10 h-128 w-2/3 flex flex-col items-center justify-center"
      >
        <ShoppingCart class="size-40" />
        <div class="font-medium text-2xl">Your Cart is Empty</div>
      </div>

      <div
        v-for="item in cartItems"
        :key="item.item_Id"
        class="p-5 w-full flex justify-between rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
      >
        <div class="flex items-center w-1/2 gap-3">
          <img :src="toBase64(item.image as string)" alt="item" class="w-15 h-15" />
          <div class="flex flex-col w-1/2 md:w-full">
            <p class="font-bold overflow-hidden text-ellipsis">{{ item.name }}</p>
            <p class="text-xs">₱{{ item.price }} each</p>
          </div>
        </div>
        <div class="flex w-1/3 lg:w-1/2 gap-1 md:gap-3 items-center justify-end">
          <Button
            @click="adjustQuantity(item.item_Id, 'minus')"
            class="cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
            ><Minus
          /></Button>
          <input :value="item.quantity" class="w-5 md:w-10 text-center" disabled />
          <Button
            @click="adjustQuantity(item.item_Id, 'add')"
            class="cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] text-[#FF6B6B]"
            ><Plus
          /></Button>
          <Button
            @click="cart.removeFromCart(item.item_Id)"
            class="cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] text-[#FF6B6B]"
            ><Trash2
          /></Button>
          <p class="text-md md:text-lg font-bold">₱{{ item.price! * item.quantity }}</p>
        </div>
      </div>

      <div
        v-if="cartItems.length !== 0"
        class="text-sm lg:text-md gap-3 p-5 w-full flex flex-col rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
      >
        <p class="font-semibold">Special Instructions</p>
        <Textarea
          v-model="instruction"
          class="bg-[#F8FAFC] w-full text-sm resize-none border-none focus:border-none focus:outline-none focus-visible:ring-0 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          placeholder="Any special requests or dietary requirements?"
        ></Textarea>
      </div>

      <!-- Address Section -->
      <div
        v-if="cartItems.length !== 0"
        class="text-sm lg:text-md gap-3 p-5 w-full flex flex-col rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
      >
        <p class="font-semibold">Delivery Address</p>

        <!-- No address -->
        <Button
          v-if="addressStore.addresses.length === 0"
          @click="showDialog = true"
          class="w-full border border-rose-500 py-10 text-rose-500 cursor-pointer"
        >
          <Plus class="size-10" />
          No address yet — Add an address
        </Button>

        <!-- Address list -->
        <div v-else>
          <RadioGroup
            :default-value="addressStore.selectedAddress?.address_Id"
            @update:modelValue="selectAddress"
          >
            <div
              v-for="a in addressStore.addresses"
              :key="a.address_Id"
              class="flex items-center p-4 space-x-2 mb-2 border border-rose-500 rounded-md"
            >
              <RadioGroupItem class="border border-rose-500" :value="a.address_Id" />
              <Label class="cursor-pointer">
                {{ a.unit_No }}, {{ a.street }}, {{ a.barangay }}, {{ a.city }}, {{ a.zip_Code }}
              </Label>
            </div>
          </RadioGroup>
          <Button
            class="mt-3 py-6 w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white"
            @click="showDialog = true"
          >
            Add New Address
          </Button>
        </div>
      </div>

      <Dialog v-model:open="showDialog">
        <DialogContent class="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <div class="flex flex-col gap-3">
            <div class="space-y-2">
              <Label for="unit_No">Unit No</Label>
              <Input id="unit_No" v-model="newAddr.unit_No" placeholder="Unit No" />
            </div>
            <div class="space-y-2">
              <Label for="street">Street</Label>
              <Input id="street" v-model="newAddr.street" placeholder="Street" />
            </div>
            <div class="space-y-2">
              <Label for="barangay">Barangay</Label>
              <Input id="barangay" v-model="newAddr.barangay" placeholder="Barangay" />
            </div>
            <div class="space-y-2">
              <Label for="city">City</Label>
              <Input id="city" v-model="newAddr.city" placeholder="City" />
            </div>
            <div class="space-y-2">
              <Label for="zip_Code">ZIP Code</Label>
              <Input
                id="zip_Code"
                v-model.number="newAddr.zip_Code"
                placeholder="ZIP Code"
                type="number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              @click="addAddress"
              class="bg-gradient-to-r from-rose-500 to-orange-500 text-white"
            >
              Save Address
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div
        v-if="cartItems.length !== 0"
        class="text-sm lg:text-md gap-5 p-5 w-full flex flex-col rounded-2xl shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
      >
        <div class="flex justify-between">
          <p>Subtotal</p>
          <p>₱{{ cartItems.reduce((acc, item) => acc + item.price! * item.quantity, 0) }}</p>
        </div>
        <div class="flex justify-between">
          <p>Delivery Fee</p>
          <p>₱9</p>
        </div>
        <div class="flex justify-between text-lg">
          <p class="font-bold">Total</p>
          <p class="font-bold">
            ₱{{ cartItems.reduce((acc, item) => acc + item.price! * item.quantity, 0) + 9 }}
          </p>
        </div>
        <Button
          :disabled="addressStore.selectedAddress === null"
          @click="placeOrder"
          class="w-full cursor-pointer p-6 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-md shadow-md hover:shadow-lg transition-all duration-300 hover:from-rose-600 hover:to-orange-600"
        >
          <p>Place Order</p>
          <ArrowRight />
        </Button>
      </div>
    </div>
  </div>
</template>
