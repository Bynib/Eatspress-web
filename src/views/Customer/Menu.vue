<script lang="ts" setup>
import CardView from '@/components/CardView.vue'
import { Utensils, Clock, Sandwich, Beef, IceCreamBowl, CupSoda } from 'lucide-vue-next'
import { onBeforeMount, ref } from 'vue'
import { useMenuStore } from '@/stores/menu'

const menu = useMenuStore()

onBeforeMount(async () => {
  await menu.getAll()
})

const activeCategory = ref('All')

const changeCategory = (category: string) => {
  activeCategory.value = category
}

const Categories = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Appetizer',
    icon: Sandwich,
    color: '#9333EA',
  },
  {
    id: 3,
    name: 'Main Course',
    icon: Beef,
    color: '#FA0A0A',
  },
  {
    id: 4,
    name: 'Dessert',
    icon: IceCreamBowl,
    color: '#221993',
  },
  {
    id: 5,
    name: 'Drinks',
    icon: CupSoda,
    color: '#F88E25',
  },
]
</script>

<template>
  <div class="w-full h-full flex flex-col gap-5 justify-center items-center">
    <div
      class="w-9/10 sm:w-9/10 md:w-9/10 lg:w-2/3 xl:w-3/4 2xl:w-1/2 flex flex-col justify-center items-center gap-5"
    >
      <p
        class="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text h-11 text-transparent"
      >
        Eatspress Cebu Food Menu
      </p>
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
    <div
      class="w-3/4 sm:w-9/10 md:w-9/10 lg:w-3/4 xl:w-3/4 2xl:w-full flex flex-wrap gap-5 justify-center items-center"
    >
      <div v-for="category in Categories" key="category.id">
        <Button
          :class="[
            'transition-all duration-300 ease-in-out cursor-pointer flex gap-2 rounded-full py-2 px-5',
            activeCategory === category.name
              ? 'cursor-pointer flex gap-2 rounded-full py-2 px-5 bg-gradient-to-r from-rose-500 to-orange-500 font-bold text-white'
              : 'cursor-pointer text-[#4B5563] flex gap-2 rounded-full py-2 px-5 shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]',
          ]"
          @click="changeCategory(category.name)"
        >
          <component
            :is="category.icon"
            :style="{ color: activeCategory === category.name ? 'white' : category.color }"
          />{{ category.name }}</Button
        >
      </div>
    </div>
    <div
      class="mb-10 w-9/10 sm:w-9/10 md:w-4/5 lg:w-4/5 xl:w-4/5 2xl:w-5/9 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center"
    >
      <CardView v-for="item in menu.items" :key="item.item_Id" :item="item" />
    </div>
  </div>
</template>
