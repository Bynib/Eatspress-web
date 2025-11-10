// models/order.ts
export interface OrderDetail {
  item_Id: number
  quantity: number
}

export interface Order {
  order_Id?: number // optional for requests
  user_Id: number
  address_Id: number
  status_Id?: number
  instruction: string
  estimated_Time: number
  created_At?: string
  details: OrderDetail[]
}
