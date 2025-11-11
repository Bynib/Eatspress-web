<script lang="ts" setup>
import { Utensils, Mail, Lock, Eye, EyeClosed, ChevronLeft, User, Phone } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { googleTokenLogin } from 'vue3-google-login'
import { useSonnerStore } from '@/stores/sonner'

const sonner = useSonnerStore()
const router = useRouter()
const auth = useAuthStore()
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  firstname: '',
  lastname: '',
  phone_No: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const togglePassword = (show: string) => {
  if (show === 'password') showPassword.value = !showPassword.value
  else showConfirmPassword.value = !showConfirmPassword.value
}

const Navigate = (route: string) => router.push(route)

const handleSignup = async () => {
  if (
    !form.firstname ||
    !form.lastname ||
    !form.phone_No ||
    !form.email ||
    !form.password ||
    !form.confirmPassword
  ) {
    sonner.error('All fields are required.')
    return
  }
  if (form.password !== form.confirmPassword) {
    sonner.error('Passwords do not match.')
    return
  }
  console.log('Form submitted:', form)
  await auth.register(form)
}
async function google() {
  const object = await googleTokenLogin()
  auth.continueWithGoogle(object)
}

onBeforeMount(() => {
  form.email = localStorage.getItem('email') || ''
  form.firstname = localStorage.getItem('firstname') || ''
  form.lastname = localStorage.getItem('lastname') || ''

  localStorage.removeItem('email')
  localStorage.removeItem('firstname')
  localStorage.removeItem('lastname')
})
</script>

<template>
  <div class="w-screen min-h-screen py-10 flex flex-col lg:justify-center items-center">
    <div
      class="w-9/10 sm:w-9/10 md:w-3/4 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mt-10 sm:mt-10 lg:mt-0 rounded-2xl p-10 shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] flex flex-col justify-center items-center gap-5 bg-[#E5E7EB]"
    >
      <div class="w-full flex gap-2 cursor-pointer" @click="Navigate('/')">
        <ChevronLeft class="cursor-pointer" />
        <p>Back to sign in</p>
      </div>

      <div class="p-5 rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]">
        <Utensils class="text-[#FF6B6B] size-10" />
      </div>

      <p class="text-2xl font-extrabold">Create your account</p>

      <div class="w-full flex flex-col gap-5">
        <div class="flex gap-2">
          <div class="flex flex-col w-1/2 gap-2">
            <p class="font-semibold">First Name</p>
            <div
              class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            >
              <User class="text-[#94A3B8]" />
              <Input
                v-model="form.firstname"
                placeholder="First name"
                class="w-full text-sm shadow-none border-none focus:border-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div class="flex flex-col w-1/2 gap-2">
            <p class="font-semibold">Last Name</p>
            <div
              class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            >
              <User class="text-[#94A3B8]" />
              <Input
                v-model="form.lastname"
                placeholder="Last name"
                class="w-full text-sm shadow-none border-none focus:border-none focus-visible:ring-0"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <p class="font-semibold">Phone Number</p>
          <div
            class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          >
            <Phone class="text-[#94A3B8]" />
            <Input
              v-model="form.phone_No"
              type="tel"
              placeholder="09xxxxxxxxx"
              class="w-full text-sm shadow-none border-none focus:border-none focus-visible:ring-0"
            />
          </div>
        </div>

        <div class="w-full flex flex-col gap-2">
          <p class="font-semibold">Email</p>
          <div
            class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          >
            <Mail class="text-[#94A3B8]" />
            <Input
              v-model="form.email"
              placeholder="you@example.com"
              class="w-full text-sm shadow-none border-none focus:border-none focus-visible:ring-0"
            />
          </div>
        </div>

        <div class="w-full flex flex-col gap-2">
          <p class="font-semibold">Password</p>
          <div
            class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          >
            <Lock class="text-[#94A3B8]" />
            <Input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full text-sm shadow-none border-none focus:border-none focus-visible:ring-0"
            />
            <Eye
              v-if="showPassword"
              @click="togglePassword('password')"
              class="text-[#94A3B8] cursor-pointer"
            />
            <EyeClosed
              v-else
              @click="togglePassword('password')"
              class="text-[#94A3B8] cursor-pointer"
            />
          </div>
        </div>

        <div class="w-full flex flex-col gap-2">
          <p class="font-semibold">Confirm Password</p>
          <div
            class="w-full bg-[#F8FAFC] flex justify-center items-center p-2 rounded-lg shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          >
            <Lock class="text-[#94A3B8]" />
            <Input
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full text-sm shadow-none border-none focus:border-none focus-visible:ring-0"
            />
            <Eye
              v-if="showConfirmPassword"
              @click="togglePassword('confirm-password')"
              class="text-[#94A3B8] cursor-pointer"
            />
            <EyeClosed
              v-else
              @click="togglePassword('confirm-password')"
              class="text-[#94A3B8] cursor-pointer"
            />
          </div>
        </div>
      </div>

      <Button
        @click="handleSignup"
        class="w-full p-6 cursor-pointer rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-md shadow-md hover:shadow-lg transition-all duration-300 hover:from-rose-600 hover:to-orange-600"
      >
        <p class="font-bold text-lg">Sign up</p>
      </Button>

      <div class="relative translate-y-1/2 w-9/10 flex flex-col justify-center items-center">
        <Separator class="text-black" />
        <p class="bg-[#E5E7EB] text-[#64748B] px-3 text-center relative -translate-y-1/2">OR</p>
      </div>

      <Button
        @click="google"
        :disabled="auth.isLoading"
        class="rounded-lg w-full p-5 py-6 flex bg-white hover:bg-white mb-5 cursor-pointer shadow-[0px_0px_12px_#ffffff,6px_6px_12px_#BEBEBE] justify-center items-center gap-5"
      >
        <span class="icon-[flat-color-icons--google] size-8"></span>
        <p class="text-lg">Sign up with Google</p>
      </Button>
    </div>
  </div>
</template>
