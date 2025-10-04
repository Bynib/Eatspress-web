<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { Toaster } from 'vue-sonner'
import { useSonnerStore } from './stores/sonner'
import 'vue-sonner/style.css'

const sonner = useSonnerStore()
const route = useRoute()

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navbarRoutes = [{ path: '/menu' }, { path: '/cart' }, { path: '/orders' }]
</script>

<template>
  <Toaster :theme="sonner.theme" />
  <Navbar v-if="navbarRoutes.some((r) => r.path === route.path)" />
  <RouterView />
  <button
    v-if="showButton"
    @click="scrollToTop"
    class="fixed cursor-pointer bottom-5 right-5 bg-[#FF6B6B] p-2 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
  >
    <ArrowUp class="text-white" />
  </button>
</template>

<style scoped></style>
