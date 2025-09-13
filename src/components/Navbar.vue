<script lang="ts" setup>
import {
  UtensilsCrossed,
  SquareMenu,
  ShoppingCart,
  Logs,
  ChevronDown,
  CircleUserRound,
  Settings,
  LogOut,
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const activeTab = ref('menu')

console.log(route.path)

const changeTab = (tab: string) => {
  router.push(tab)
}
</script>

<template>
  <div
    class="w-full flex justify-between p-5 sticky top-0 bg-[linear-gradient(to_bottom,rgba(229,231,235,1)_0%,rgba(229,231,235,0.9)_30%,rgba(229,231,235,0.6)_60%,rgba(229,231,235,0.3)_80%,transparent_100%)]"
  >
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
            <span v-if="route.path === '/menu'" class="flex gap-2 items-center p-5">
              <SquareMenu />
              <p>Menu</p>
            </span>
            <span v-if="route.path === '/cart'" class="flex gap-2 items-center p-5">
              <ShoppingCart />
              <p>Cart</p>
            </span>
            <span v-if="route.path === '/orders'" class="flex gap-2 items-center p-5">
              <Logs />
              <p>Orders</p>
            </span>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="changeTab('menu')">
            <SquareMenu :class="route.path === '/menu' ? 'text-[#FF6B6B]' : ''" />
            <p :class="route.path === '/menu' ? 'text-[#FF6B6B]' : ''">Menu</p>
          </DropdownMenuItem>
          <DropdownMenuItem @click="changeTab('cart')">
            <ShoppingCart :class="route.path === '/cart' ? 'text-[#FF6B6B]' : ''" />
            <p :class="route.path === '/cart' ? 'text-[#FF6B6B]' : ''">Cart</p>
          </DropdownMenuItem>
          <DropdownMenuItem @click="changeTab('orders')">
            <Logs :class="route.path === '/orders' ? 'text-[#FF6B6B]' : ''" />
            <p :class="route.path === '/orders' ? 'text-[#FF6B6B]' : ''">Orders</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <!-- view if screen is md or larger -->
    <div class="hidden md:gap-10 lg:gap-20 md:flex w-1/3 justify-center">
      <div class="flex h-full items-center gap-2 cursor-pointer" @click="changeTab('menu')">
        <SquareMenu :class="route.path === '/menu' ? 'text-[#FF6B6B]' : ''" />
        <p :class="route.path === '/menu' ? 'text-[#FF6B6B]' : ''">Menu</p>
      </div>
      <div class="flex h-full items-center gap-2 cursor-pointer" @click="changeTab('cart')">
        <ShoppingCart :class="route.path === '/cart' ? 'text-[#FF6B6B]' : ''" />
        <p :class="route.path === '/cart' ? 'text-[#FF6B6B]' : ''">Cart</p>
      </div>
      <div class="flex h-full items-center gap-2 cursor-pointer" @click="changeTab('orders')">
        <Logs :class="route.path === '/orders' ? 'text-[#FF6B6B]' : ''" />
        <p :class="route.path === '/orders' ? 'text-[#FF6B6B]' : ''">Orders</p>
      </div>
    </div>

    <div class="flex gap-3 items-center justify-end w-1/3">
      <span class="hidden md:block">Customer Name</span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            class="p-3 size-[50px] cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
          >
            <CircleUserRound class="size-[25px]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="mr-5">
          <DropdownMenuItem class="cursor-pointer">
            <Settings />
            <p>Settings</p>
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer">
            <LogOut />
            <p>Logout</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
