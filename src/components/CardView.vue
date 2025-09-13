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
          <img src="@/assets/kaldereta.png" alt="kaldereta" class="w-full"></img>
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
        class="w-full text-[#FF6B6B] cursor-pointer font-bold flex gap-2 rounded-full py-2 px-5 shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
        ><p class="w-full text-center">Add to Cart</p></Button
      >
    </CardFooter>
  </Card>
</template>
