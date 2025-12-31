import type  {CartItem, ShippingAdress } from "./Cart";
import type { User } from "./User";

export type Order ={
    _id:string
    orderItems:CartItem[]
    shippingAdress:ShippingAdress
    paymentMethod:string
    user:User
    createdAt:string
    isPaid:boolean
    paidAt:string
    isDelivered:boolean
    itemsPrice:number
    shippingPrice:number
    taxPrice:number
    totalPrice:number
}