// models/address.ts
export interface Address {
  address_Id?: number // optional for creation
  unit_No: string
  street: string
  barangay: string
  city: string
  zip_Code: number
}
