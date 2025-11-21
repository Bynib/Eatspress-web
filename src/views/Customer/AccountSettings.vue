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
  CircleUser,
  Plus,
} from 'lucide-vue-next'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAddressStore } from '@/stores/address'
import { useSonnerStore } from '@/stores/sonner'
import { useAuthStore } from '@/stores/auth'
import type { Address } from '@/models/address'

const router = useRouter()

const editProfile = ref(false)

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const addressStore = useAddressStore()
const auth = useAuthStore()
const sonner = useSonnerStore()
const showDialog = ref(false)
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)
const newAddr = ref({
  unit_No: '',
  street: '',
  barangay: '',
  city: '',
  zip_Code: 0,
})

const deleteAddr = ref<Address | null>(null)

const editAddr = ref<Address>({
  unit_No: '',
  street: '',
  barangay: '',
  city: '',
  zip_Code: 0,
})
const user = ref<{
  firstname: string
  lastname: string
  email: string
  phone_No: string
  oldPassword?: string
  newPassword?: string
  confirmPassword?: string
}>({ ...auth.userInfo })
console.log('user', user.value)

const togglePassword = (show: string) => {
  if (show === 'current') showCurrentPassword.value = !showCurrentPassword.value
  else if (show === 'new') showNewPassword.value = !showNewPassword.value
  else showConfirmPassword.value = !showConfirmPassword.value
}

const toggleButtons = (command: string) => {
  if (command === 'edit') {
    editProfile.value = !editProfile.value
    user.value.oldPassword = ''
    user.value.newPassword = ''
    user.value.confirmPassword = ''
    showCurrentPassword.value = false
    showNewPassword.value = false
    showDialog.value = false
    showConfirmPassword.value = false
  } else {
    showDialog.value = !showDialog.value
  }
}

const updateProfile = async () => {
  if (
    user.value.firstname === auth.userInfo.firstname &&
    user.value.lastname === auth.userInfo.lastname &&
    user.value.email === auth.userInfo.email &&
    user.value.phone_No === auth.userInfo.phone_No &&
    !user.value.oldPassword &&
    !user.value.newPassword &&
    !user.value.oldPassword
  )
    return toggleButtons('edit')
  const res = await auth.update(user.value)
  if (res) toggleButtons('edit')
}

const addAddress = async () => {
  if (
    !newAddr.value.unit_No ||
    !newAddr.value.street ||
    !newAddr.value.barangay ||
    !newAddr.value.city ||
    !newAddr.value.zip_Code
  )
    return sonner.error('All fields are required')

  const res = await addressStore.create({ ...newAddr.value })

  if (res) {
    Object.assign(newAddr.value, { unit_No: '', street: '', barangay: '', city: '', zip_Code: 0 })
    user.value.oldPassword = ''
    user.value.newPassword = ''
    user.value.confirmPassword = ''
    showDialog.value = false
  }
}

const updateAddress = async (a: Address) => {
  if (
    !editAddr.value.unit_No ||
    !editAddr.value.street ||
    !editAddr.value.barangay ||
    !editAddr.value.city ||
    !editAddr.value.zip_Code
  )
    return sonner.error('All fields are required')
  const res = await addressStore.update(a)
  if (res) showEditDialog.value = false
}

const editAddress = (a: Address) => {
  showEditDialog.value = true
  editAddr.value = a
}

const deleteAddress = (a: Address) => {
  deleteAddr.value = a
  showDeleteDialog.value = true
}

const confirmDeleteAddress = async () => {
  await addressStore.remove(deleteAddr.value?.address_Id ?? 0)
  showDeleteDialog.value = false
}

onBeforeMount(async () => {
  if (addressStore.addresses.length === 0 && addressStore.isLoading === false) {
    await addressStore.getByUser(auth.user?.user_Id ?? 0)
  }
})
</script>

<template>
  <div class="w-screen h-screen flex flex-col gap-5 lg:justify-center items-center">
    <div
      class="w-9/10 sm:w-9/10 md:w-9/10 lg:w-2/3 xl:w-3/5 2xl:w-2/5 mt-5 sm:mt-5 lg:mt-0 flex flex-col justify-center gap-5"
    >
      <div class="flex items-center gap-3">
        <Button
          @click="router.push('/menu')"
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
              v-model="user.firstname"
              class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">Last Name</p>
            <Input
              :disabled="!editProfile"
              type="text"
              v-model="user.lastname"
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
              v-model="user.email"
              class="w-full p-2 rounded-lg border-none hover:border-none focus-visible:ring-0 bg-white shadow-[inset_0px_0px_0px_#ffffff,inset_3px_3px_5px_#BEBEBE]"
            />
          </div>
          <div class="lg:w-1/2">
            <p class="text-sm sm:text-sm md:text-md">Phone Number</p>
            <Input
              :disabled="!editProfile"
              type="text"
              v-model="user.phone_No"
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
                v-model="user.oldPassword"
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
                v-model="user.newPassword"
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
                v-model="user.confirmPassword"
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
            <CircleMinus v-if="showDialog" class="size-5 text-white" />
            <CirclePlus v-else class="size-5 text-white" />
          </Button>
        </div>
        <div class="flex w-full gap-3">
          <!-- No address -->
          <Button
            v-if="addressStore.addresses.filter((r) => !r.isDeleted).length === 0"
            @click="showDialog = true"
            class="w-full border border-rose-500 py-10 text-rose-500 cursor-pointer"
          >
            <Plus class="size-10" />
            No address yet — Add an address
          </Button>

          <!-- Address list -->
          <div v-else class="w-full">
            <div
              v-for="a in addressStore.addresses.filter((r) => !r.isDeleted)"
              :key="a.address_Id"
              class="flex items-center justify-between p-4 space-x-2 mb-2 border rounded-md w-full"
              :class="!editProfile ? 'border-gray-500' : 'border-rose-500'"
            >
              <Label
                :for="a.address_Id!.toString()"
                class="py-2"
                :class="!editProfile ? 'text-black/50' : ''"
              >
                {{ a.unit_No }}, {{ a.street }}, {{ a.barangay }}, {{ a.city }}, {{ a.zip_Code }}
              </Label>
              <div class="space-x-2">
                <Button
                  v-if="editProfile"
                  @click="editAddress(a)"
                  class="text-[#FF6B6B] p-3 cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
                >
                  <Pencil class="size-5" />
                </Button>
                <Button
                  v-if="editProfile"
                  @click="deleteAddress(a)"
                  class="p-3 cursor-pointer rounded-full shadow-[-6px_-6px_12px_#ffffff,6px_6px_12px_#BEBEBE]"
                >
                  <Trash2 class="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Button
          :disabled="auth.isLoading"
          @click="toggleButtons('edit')"
          class="font-bold text-lg w-full cursor-pointer border border-[#FF6B6B] bg-white bg-gradient-to-b from-rose-500 to-orange-500 bg-clip-text text-transparent p-6 rounded-lg shadow-none mt-3"
          >{{ editProfile ? 'Cancel' : 'Edit Profile' }}</Button
        >
        <Button
          v-if="editProfile"
          :disabled="auth.isLoading"
          @click="updateProfile"
          class="font-bold text-lg w-full cursor-pointer bg-gradient-to-r text-white p-6 rounded-lg from-rose-500 to-orange-500 mb-3"
        >
          <Save />Save
        </Button>
      </div>
    </div>
  </div>

  <Dialog v-model:open="showDialog">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Add New Address</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-3">
        <div class="space-y-2">
          <Label for="unit_No">Unit No</Label>
          <Input id="unit_No" v-model="newAddr.unit_No" placeholder="Unit No" />
        </div>
        <div class="space-y-2">
          <Label for="street">Street</Label>
          <Input id="street" v-model="newAddr.street" placeholder="Street" />
        </div>
        <div class="space-y-2">
          <Label for="barangay">Barangay</Label>
          <Input id="barangay" v-model="newAddr.barangay" placeholder="Barangay" />
        </div>
        <div class="space-y-2">
          <Label for="city">City</Label>
          <Input id="city" v-model="newAddr.city" placeholder="City" />
        </div>
        <div class="space-y-2">
          <Label for="zip_Code">ZIP Code</Label>
          <Input
            id="zip_Code"
            v-model.number="newAddr.zip_Code"
            placeholder="ZIP Code"
            type="number"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          :disabled="addressStore.isLoading"
          @click="addAddress"
          class="bg-gradient-to-r from-rose-500 to-orange-500 text-white"
        >
          Save Address
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- Edit Dialog -->
  <Dialog v-model:open="showEditDialog">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit Address</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-3">
        <div class="space-y-2">
          <Label for="unit_No">Unit No</Label>
          <Input id="unit_No" v-model="editAddr.unit_No" placeholder="Unit No" />
        </div>
        <div class="space-y-2">
          <Label for="street">Street</Label>
          <Input id="street" v-model="editAddr.street" placeholder="Street" />
        </div>
        <div class="space-y-2">
          <Label for="barangay">Barangay</Label>
          <Input id="barangay" v-model="editAddr.barangay" placeholder="Barangay" />
        </div>
        <div class="space-y-2">
          <Label for="city">City</Label>
          <Input id="city" v-model="editAddr.city" placeholder="City" />
        </div>
        <div class="space-y-2">
          <Label for="zip_Code">ZIP Code</Label>
          <Input
            id="zip_Code"
            v-model.number="editAddr.zip_Code"
            placeholder="ZIP Code"
            type="number"
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          :disabled="addressStore.isLoading"
          @click="async () => await updateAddress(editAddr)"
          class="bg-gradient-to-r from-rose-500 to-orange-500 text-white"
        >
          Save Address
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Dialog v-model:open="showDeleteDialog">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Delete Address</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-3">Are you sure you want to delete this address?</div>
      <DialogFooter>
        <Button
          @click="showDeleteDialog = false"
          :disabled="addressStore.isLoading"
          class="cursor-pointer border border-[#FF6B6B] bg-white bg-gradient-to-b from-rose-500 to-orange-500 bg-clip-text text-transparent"
        >
          No
        </Button>
        <Button
          @click="confirmDeleteAddress"
          :disabled="addressStore.isLoading"
          class="cursor-pointer bg-gradient-to-r from-rose-500 to-orange-500 text-white"
        >
          Yes
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
