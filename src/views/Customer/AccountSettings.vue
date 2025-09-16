<script lang="ts" setup>
import {
  UserRound,
  MapPin,
  ArrowLeft,
  CirclePlus,
  CircleMinus,
  Pencil,
  Trash2,
  Save,
  Lock,
  Eye,
  EyeClosed,
} from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const editProfile = ref(false)
const addAddress = ref(false)

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const togglePassword = (show: string) => {
  if (show === 'current') showCurrentPassword.value = !showCurrentPassword.value
  else if (show === 'new') showNewPassword.value = !showNewPassword.value
  else showConfirmPassword.value = !showConfirmPassword.value
}

const toggleButtons = (command: string) => {
  command === 'edit'
    ? ((editProfile.value = !editProfile.value),
      (addAddress.value = false),
      (showCurrentPassword.value = false),
      (showNewPassword.value = false),
      (showConfirmPassword.value = false))
    : (addAddress.value = !addAddress.value)
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col gap-5 lg:justify-center items-center">
    <div
      class="w-9/10 sm:w-9/10 md:w-9/10 lg:w-2/3 xl:w-3/5 2xl:w-2/5 mt-5 sm:mt-5 lg:mt-0 flex flex-col justify-center gap-5"
    >
      <div class="flex items-center gap-3">
        <Button
          @click="router.go(-1)"
          class="p-2 rounded-full cursor-pointer shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
        >
          <ArrowLeft class="size-5" />
        </Button>
        <div class="flex flex-col">
          <p
            class="text-2xl md:text-2xl font-extrabold bg-gradient-to-b from-rose-500 to-orange-500 bg-clip-text text-transparent"
          >
            Account Settings
          </p>
          <p>Manage your information</p>
        </div>
      </div>
      <div
        class="w-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] p-6 sm:p-6 md:p-10 flex flex-col rounded-xl gap-5 mb-10"
      >
        <div class="flex gap-2 items-center">
          <UserRound />
          <p class="font-bold">Profile Information</p>
        </div>
        <div class="flex flex-col lg:flex-row gap-5">
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">First Name</p>
            <Input
              :disabled="!editProfile"
              type="text"
              class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">Last Name</p>
            <Input
              :disabled="!editProfile"
              type="text"
              class="input w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
        </div>
        <div class="flex flex-col lg:flex-row gap-5">
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">Email Address</p>
            <Input
              :disabled="!editProfile"
              type="text"
              class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">Phone Number</p>
            <Input
              :disabled="!editProfile"
              type="text"
              class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
        </div>
        <div class="flex justify-between w-full mt-5">
          <div class="flex gap-2 items-center">
            <Lock />
            <p class="font-bold">Password</p>
          </div>
        </div>
        <div v-if="!editProfile" class="flex flex-col lg:flex-row gap-5">
          <Input
            disabled
            type="password"
            placeholder="••••••••"
            class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          />
        </div>
        <div v-else class="flex flex-col lg:flex-row gap-5">
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">Current Password</p>
            <div
              class="w-full flex items-center gap-2 pr-2 rounded-lg bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            >
              <Input
                :disabled="!editProfile"
                :type="showCurrentPassword ? 'text' : 'password'"
                class="border-none shadow-none hover:border-none focus-visible:ring-0"
              />
              <Eye
                v-if="showCurrentPassword"
                @click="togglePassword('current')"
                class="text-[#94A3B8] cursor-pointer"
              />
              <EyeClosed
                v-else
                @click="togglePassword('current')"
                class="text-[#94A3B8] cursor-pointer"
              />
            </div>
          </div>
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">New Password</p>
            <div
              class="w-full flex items-center gap-2 pr-2 rounded-lg bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            >
              <Input
                :disabled="!editProfile"
                :type="showNewPassword ? 'text' : 'password'"
                class="border-none shadow-none hover:border-none focus-visible:ring-0"
              />
              <Eye
                v-if="showNewPassword"
                @click="togglePassword('new')"
                class="text-[#94A3B8] cursor-pointer"
              />
              <EyeClosed
                v-else
                @click="togglePassword('new')"
                class="text-[#94A3B8] cursor-pointer"
              />
            </div>
          </div>
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">Confirm Password</p>
            <div
              class="w-full flex items-center gap-2 pr-2 rounded-lg bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            >
              <Input
                :disabled="!editProfile"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="border-none shadow-none hover:border-none focus-visible:ring-0"
              />
              <Eye
                v-if="showConfirmPassword"
                @click="togglePassword('confirm')"
                class="text-[#94A3B8] cursor-pointer"
              />
              <EyeClosed
                v-else
                @click="togglePassword('confirm')"
                class="text-[#94A3B8] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-between w-full mt-5">
          <div class="flex gap-2 items-center">
            <MapPin />
            <p class="font-bold">Address</p>
          </div>
          <Button
            v-if="editProfile"
            @click="toggleButtons('add')"
            class="p-3 cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE] bg-gradient-to-r from-rose-500 to-orange-500"
          >
            <CircleMinus v-if="addAddress" class="size-5 text-white" />
            <CirclePlus v-else class="size-5 text-white" />
          </Button>
        </div>
        <div v-if="!addAddress" class="flex w-full gap-3">
          <Input
            disabled
            type="text"
            placeholder="Your Address"
            class="bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
          />
          <Button
            v-if="editProfile"
            class="text-[#FF6B6B] p-3 cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
          >
            <Pencil class="size-5" />
          </Button>
          <Button
            v-if="editProfile"
            class="p-3 cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
          >
            <Trash2 class="size-5" />
          </Button>
        </div>
        <div v-if="addAddress" class="flex flex-col w-full gap-5">
          <div class="">
            <p class="text-sm sm:text-sm md:text-md">Street</p>
            <Input
              type="text"
              class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
          <div class="">
            <p class="text-sm sm:text-sm md:text-md">
              Apartment, Suite, Unit, Building, Floor, etc.
            </p>
            <Input
              type="text"
              class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
          <div class="flex gap-5">
            <div class="w-1/3">
              <p class="text-sm sm:text-sm md:text-md">Barangay</p>
              <Input
                type="text"
                class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
              />
            </div>
            <div class="w-1/3">
              <p class="text-sm sm:text-sm md:text-md">City</p>
              <Input
                type="text"
                class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
              />
            </div>
            <div class="w-1/3">
              <p class="text-sm sm:text-sm md:text-md">Zip Code</p>
              <Input
                type="text"
                class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
              />
            </div>
          </div>
        </div>
        <Button
          @click="toggleButtons('edit')"
          class="font-bold text-lg w-full cursor-pointer border border-[#FF6B6B] bg-white bg-gradient-to-b from-rose-500 to-orange-500 bg-clip-text text-transparent p-6 rounded-lg shadow-none mt-3"
          >{{ editProfile ? 'Cancel' : 'Edit Profile' }}</Button
        >
        <Button
          class="font-bold text-lg w-full cursor-pointer bg-gradient-to-r text-white p-6 rounded-lg from-rose-500 to-orange-500 mb-3"
          ><Save />Save</Button
        >
      </div>
    </div>
  </div>
</template>
