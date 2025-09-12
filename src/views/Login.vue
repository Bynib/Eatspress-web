<script lang="ts" setup>
import { Utensils, Mail, Lock, Eye, EyeClosed } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
const Navigate = (string: string) => {
  router.push(string)
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col lg:justify-center items-center">
    <div
      class="w-9/10 sm:w-9/10 md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mt-10 sm:mt-10 lg:mt-0 rounded-2xl p-10 shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] flex flex-col justify-center items-center gap-5 bg-[#E5E7EB]"
    >
      <div class="p-5 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
        <Utensils class="text-[#FF6B6B]" />
      </div>
      <p class="text-2xl font-extrabold">Eatspress</p>
      <p class="text-[#64748B]">Sign in to continue</p>
      <Button
        class="rounded-lg w-full p-5 flex shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] justify-center items-center gap-5"
      >
        <span class="icon-[flat-color-icons--google]"></span>
        <p class="text-md">Continue with Google</p>
      </Button>
      <div class="relative translate-y-1/2 w-9/10 flex flex-col justify-center items-center">
        <Separator class="text-black" />
        <p class="bg-[#E5E7EB] text-[#64748B] px-3 text-center relative -translate-y-1/2">OR</p>
      </div>
      <p class="font-semibold">Email</p>
      <div
        class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
      >
        <Mail class="text-[#94A3B8]" />
        <Input
          placeholder="you@example.com"
          class="w-full h-full shadow-none border-none focus:border-none focus-visible:ring-0"
        />
      </div>
      <p class="font-semibold">Password</p>
      <div
        class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
      >
        <Lock class="text-[#94A3B8]" />
        <Input
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          class="w-full h-full shadow-none border-none focus:border-none focus-visible:ring-0"
        />
        <Eye v-if="showPassword" @click="togglePassword" class="text-[#94A3B8]" />
        <EyeClosed v-else @click="togglePassword" class="text-[#94A3B8]" />
      </div>
      <Button
        class="mt-5 rounded-lg w-full p-5 flex shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] justify-center items-center gap-5"
      >
        <p class="font-bold text-lg">Sign in</p>
      </Button>
      <div class="flex justify-between items-center w-full">
        <p class="text-sm font-semibold cursor-pointer">Forgot password?</p>
        <p class="text-sm">
          Need an account?
          <span class="font-bold cursor-pointer" @click="Navigate('/register')">Sign up</span>
        </p>
      </div>
    </div>
  </div>
</template>
