<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <Card class="w-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
      <CardHeader >
          <img src="@/assets/chickenskin.jpg" alt="kaldereta" class="w-full rounded-md"></img>
      <CardTitle>
        <p>Kaldereta</p></CardTitle>
      <CardDescription>Beef stew cooked with tomato sauce and liver spread.</CardDescription>
    </CardHeader>
    <CardContent class="flex justify-between">
      <p class="font-bold">₱300</p>
      <div
        class="text-[#4B6A8F] text-xs font-bold flex gap-2 rounded-full py-1 px-2 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]"
      >
        5 mins
      </div>
    </CardContent>
    <CardFooter>
      <Button
        class="w-full cursor-pointer p-3 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-md shadow-md hover:shadow-lg transition-all duration-300 hover:from-rose-600 hover:to-orange-600"
        ><p class="w-full text-center">Add to Cart</p></Button
      >
    </CardFooter>
  </Card>
</template>
