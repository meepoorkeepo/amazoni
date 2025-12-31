export type CartItem = {
    name:string
    image: string|undefined
    slug:string
    quantity:number
    countInStock:number
    price:number
    _id:string
}


export type ShippingAdress = {
    fullName:string
    adress:string
    city:string
    country:string
    postalCode:string
}


export type Cart = {
    itemsPrice:number
    shippingAdress:ShippingAdress
    shippingPrice:number
    taxPrice:number
    totalPrice:number
    cartItems:CartItem[]
    paymentMethod:string
}