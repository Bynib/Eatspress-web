<script lang="ts" setup>
import {
  UtensilsCrossed,
  Utensils,
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
    <div class="hidden sm:flex md:flex z-1 items-center gap-3 md:w-1/3">
      <div class="p-2.5 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg">
        <Utensils class="text-white" />
      </div>
      <p class="font-bold hidden text-xl md:block">Eatspress</p>
    </div>

    <!-- view if screen is smaller than md -->
    <div class="md:hidden flex w-full">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div class="relative">
            <div
              class="absolute -translate-y-1/10 p-2.5 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg"
            >
              <Utensils class="text-white" />
            </div>
            <Button class="rounded-full bg-white">
              <span v-if="route.path === '/menu'" class="flex gap-2 items-center pl-8">
                <SquareMenu />
                <p>Menu</p>
              </span>
              <span v-if="route.path === '/cart'" class="flex gap-2 items-center pl-8">
                <ShoppingCart />
                <p>Cart</p>
              </span>
              <span v-if="route.path === '/orders'" class="flex gap-2 items-center pl-8">
                <Logs />
                <p>Orders</p>
              </span>
              <!-- <ChevronDown /> -->
            </Button>
          </div>
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
    <div class="hidden md:gap-10 lg:gap-20 md:flex w-1/3 justify-center text-xl font-semibold">
      <div
        class="flex h-full items-center gap-2 cursor-pointer group relative"
        @click="changeTab('menu')"
      >
        <SquareMenu
          class="group-hover:text-[#FF6B6B]"
          :class="route.path === '/menu' ? 'text-[#FF6B6B]' : ''"
        />
        <p
          class="group-hover:text-[#FF6B6B]"
          :class="route.path === '/menu' ? 'text-[#FF6B6B]' : ''"
        >
          Menu
        </p>
        <span
          class="absolute left-1/2 -bottom-0.5 -translate-x-1/2 origin-center transition-transform duration-300 w-full h-[2px] bg-[#FF6B6B] scale-x-0 group-hover:scale-x-100"
        ></span>
      </div>
      <div
        class="flex h-full items-center gap-2 cursor-pointer group relative"
        @click="changeTab('cart')"
      >
        <ShoppingCart
          class="group-hover:text-[#FF6B6B]"
          :class="route.path === '/cart' ? 'text-[#FF6B6B]' : ''"
        />
        <p
          class="group-hover:text-[#FF6B6B]"
          :class="route.path === '/cart' ? 'text-[#FF6B6B]' : ''"
        >
          Cart
        </p>
        <span
          class="absolute left-1/2 -bottom-0.5 -translate-x-1/2 origin-center transition-transform duration-300 w-full h-[2px] bg-[#FF6B6B] scale-x-0 group-hover:scale-x-100"
        ></span>
      </div>
      <div
        class="flex h-full items-center gap-2 cursor-pointer group relative"
        @click="changeTab('orders')"
      >
        <Logs
          class="group-hover:text-[#FF6B6B]"
          :class="route.path === '/orders' ? 'text-[#FF6B6B]' : ''"
        />
        <p
          class="group-hover:text-[#FF6B6B]"
          :class="route.path === '/orders' ? 'text-[#FF6B6B]' : ''"
        >
          Orders
        </p>
        <span
          class="absolute left-1/2 -bottom-0.5 -translate-x-1/2 origin-center transition-transform duration-300 w-full h-[2px] bg-[#FF6B6B] scale-x-0 group-hover:scale-x-100"
        ></span>
      </div>
    </div>

    <div class="flex gap-3 items-center justify-end w-1/3">
      <span class="hidden md:block">Customer Name</span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            class="p-3 size-[50px] cursor-pointer rounded-full bg-[#E5E7EB] shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
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
