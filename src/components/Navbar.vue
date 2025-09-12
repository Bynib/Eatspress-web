<script lang="ts" setup>
import {
  UtensilsCrossed,
  SquareMenu,
  ShoppingCart,
  Logs,
  ChevronDown,
  LogOut,
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

const activeTab = ref('menu')

const changeTab = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <div class="w-full flex justify-between p-5">
    <div class="flex items-center gap-3 w-1/3">
      <div class="p-3 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
        <UtensilsCrossed />
      </div>
      <p class="font-extrabold hidden md:block">Eatspress</p>
    </div>
    <!-- view if screen is smaller than md -->
    <div class="md:hidden flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button class="rounded-full text-[#FF6B6B] bg-white">
            <span v-if="activeTab === 'menu'" class="flex gap-2 items-center p-5">
              <SquareMenu />
              <p>Menu</p>
            </span>
            <span v-if="activeTab === 'cart'" class="flex gap-2 items-center p-5">
              <ShoppingCart />
              <p>Cart</p>
            </span>
            <span v-if="activeTab === 'orders'" class="flex gap-2 items-center p-5">
              <Logs />
              <p>Orders</p>
            </span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="changeTab('menu')">
            <SquareMenu :class="activeTab === 'menu' ? 'text-[#FF6B6B]' : ''" />
            <p :class="activeTab === 'menu' ? 'text-[#FF6B6B]' : ''">Menu</p>
          </DropdownMenuItem>
          <DropdownMenuItem @click="changeTab('cart')">
            <ShoppingCart :class="activeTab === 'cart' ? 'text-[#FF6B6B]' : ''" />
            <p :class="activeTab === 'cart' ? 'text-[#FF6B6B]' : ''">Cart</p>
          </DropdownMenuItem>
          <DropdownMenuItem @click="changeTab('orders')">
            <Logs :class="activeTab === 'orders' ? 'text-[#FF6B6B]' : ''" />
            <p :class="activeTab === 'orders' ? 'text-[#FF6B6B]' : ''">Orders</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- view if screen is md or larger -->
    <div class="hidden gap-20 md:flex w-1/3 justify-center">
      <div class="flex h-full items-center gap-2 cursor-pointer" @click="changeTab('menu')">
        <SquareMenu :class="activeTab === 'menu' ? 'text-[#FF6B6B]' : ''" />
        <p :class="activeTab === 'menu' ? 'text-[#FF6B6B]' : ''">Menu</p>
      </div>
      <div class="flex h-full items-center gap-2 cursor-pointer" @click="changeTab('cart')">
        <ShoppingCart :class="activeTab === 'cart' ? 'text-[#FF6B6B]' : ''" />
        <p :class="activeTab === 'cart' ? 'text-[#FF6B6B]' : ''">Cart</p>
      </div>
      <div class="flex h-full items-center gap-2 cursor-pointer" @click="changeTab('orders')">
        <Logs :class="activeTab === 'orders' ? 'text-[#FF6B6B]' : ''" />
        <p :class="activeTab === 'orders' ? 'text-[#FF6B6B]' : ''">Orders</p>
      </div>
    </div>

    <div class="flex gap-3 items-center justify-end w-1/3">
      <p class="hidden md:block">Customer Name</p>
      <div class="p-3 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
        <LogOut />
      </div>
    </div>
  </div>
</template>
