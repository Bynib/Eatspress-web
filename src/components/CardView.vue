<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Menu } from '@/models/menu';
import { toBase64 } from '@/plugins/convert';
import { useCartStore } from '@/stores/cart';
import { Button } from './ui/button';
const cart = useCartStore();
  interface Props {
      item: Menu
    }
  const props = defineProps<Props>();

  const categoryList = [
  { id: 1, type: 'Appetizer' },
  { id: 2, type: 'Main Course' },
  { id: 3, type: 'Dessert' },
  { id: 4, type: 'Beverage' },
]
const addToCart = async () => {
  // if (!auth.user) {
  //   cart.sonner.error('You must be logged in to add to cart')
  //   return
  // }
  await cart.addToCart(props.item.item_Id, 1)
}
const isInCart = () =>{
  return cart.items.find((i) => i.item_Id === props.item.item_Id)
}
</script>

<template>
  <Card class="w-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
      <CardHeader >
        <div class="h-50 w-full">

          <img :src="toBase64(item.image as string)" alt="kaldereta" class="w-full h-full object-cover rounded-md"></img>
        </div>
      <CardTitle class="flex w-full justify-between">
        <p>{{ item.name }}</p>
        <div
        class="bg-[#E5E7EB] rounded-full px-2 py-1 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE] flex gap-2 items-center"
        >
        <span class="text-gray-500 text-sm font-normal">
          {{ categoryList.find((i) => i.id === item.category_Id)?.type }}
        </span>
      </div>
    </CardTitle>
      <CardDescription>{{ item.description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex justify-between">
      <p class="font-bold">₱{{item.price}}</p>
      <div
        class="text-[#4B6A8F] text-xs font-bold flex gap-2 rounded-full py-1 px-2 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]"
      >
       {{ item.prep_Time }} mins
      </div>
    </CardContent>
    <CardFooter>
      <Button
        :disabled="isInCart()"
        class="w-full cursor-pointer p-3 py-6 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-md shadow-md hover:shadow-lg transition-all duration-300 hover:from-rose-600 hover:to-orange-600"
        @click="addToCart"
        ><p class="w-full text-center">{{ isInCart() ? 'In Cart' : 'Add to Cart' }}</p></Button
      >
    </CardFooter>
  </Card>
</template>
