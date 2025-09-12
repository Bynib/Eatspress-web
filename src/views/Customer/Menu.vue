<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
import { Utensils, Clock, Sandwich, Beef, IceCreamBowl, CupSoda } from 'lucide-vue-next'
import { ref } from 'vue'

const activeCategory = ref('all')

const changeCategory = (category: string) => {
  activeCategory.value = category
}
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
    <Navbar />
    <div
      class="w-9/10 sm:w-9/10 md:w-9/10 lg:w-2/3 xl:w-3/4 2xl:w-1/2 flex flex-col justify-center items-center gap-5"
    >
      <div class="p-5 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
        <Utensils class="text-[#FF6B6B]" />
      </div>
      <p class="text-2xl md:text-4xl font-extrabold">Eatspress Cebu Food Menu</p>
      <p class="text-center text-sm">
        Crafted with love, served with passion. Discover our handpicked selection of culinary
        delights.
      </p>
      <div class="flex gap-2 items-center">
        <div class="rounded-full p-2 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]">
          <Clock class="text-[#BEBEBE] size-4" />
        </div>
        <p class="text-[#4B5563]">15-45 mins delivery</p>
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-5 justify-center items-center">
      <Button
        :class="
          activeCategory === 'all'
            ? 'cursor-pointer font-bold flex gap-2 rounded-full py-2 px-5 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]'
            : 'cursor-pointer text-[#4B5563] flex gap-2 rounded-full py-2 px-5 shadow-[6px_6px_12px_#ffffff,-6px_-6px_12px_#BEBEBE]'
        "
        @click="changeCategory('all')"
        >All Items</Button
      >
      <Button
        :class="
          activeCategory === 'appetizer'
            ? 'cursor-pointer font-bold flex gap-2 rounded-full py-2 px-5 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]'
            : 'cursor-pointer text-[#4B5563] flex gap-2 rounded-full py-2 px-5 shadow-[6px_6px_12px_#ffffff,-6px_-6px_12px_#BEBEBE]'
        "
        @click="changeCategory('appetizer')"
      >
        <Sandwich />
        Appetizers
      </Button>
      <Button
        :class="
          activeCategory === 'main-course'
            ? 'cursor-pointer font-bold flex gap-2 rounded-full py-2 px-5 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]'
            : 'cursor-pointer text-[#4B5563] flex gap-2 rounded-full py-2 px-5 shadow-[6px_6px_12px_#ffffff,-6px_-6px_12px_#BEBEBE]'
        "
        @click="changeCategory('main-course')"
      >
        <Beef />
        Main Course
      </Button>
      <Button
        :class="
          activeCategory === 'desserts'
            ? 'cursor-pointer font-bold flex gap-2 rounded-full py-2 px-5 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]'
            : 'cursor-pointer text-[#4B5563] flex gap-2 rounded-full py-2 px-5 shadow-[6px_6px_12px_#ffffff,-6px_-6px_12px_#BEBEBE]'
        "
        @click="changeCategory('desserts')"
      >
        <IceCreamBowl />
        Desserts</Button
      >
      <Button
        :class="
          activeCategory === 'beverages'
            ? 'cursor-pointer font-bold flex gap-2 rounded-full py-2 px-5 shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_8px_#BEBEBE]'
            : 'cursor-pointer text-[#4B5563] flex gap-2 rounded-full py-2 px-5 shadow-[6px_6px_12px_#ffffff,-6px_-6px_12px_#BEBEBE]'
        "
        @click="changeCategory('beverages')"
      >
        <CupSoda />
        Beverages</Button
      >
    </div>
    <div class="w-full flex flex-wrap gap-5 justify-center items-center"></div>
  </div>
</template>
