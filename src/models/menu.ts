export interface Menu {
  item_Id: number
  name: string
  description: string
  prep_Time: number
  category_Id: number
  price: number
  image?: string | File | null
  isDeleted?: boolean
}
