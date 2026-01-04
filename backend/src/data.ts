import type { Product } from './models/productModel'
import { User } from './models/userModel'
import bcrypt from 'bcryptjs'

export const sampleProducts: Product[] = [
  {
    name: "iPhone 17",
    slug: "iphone-17",
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGlQaG9uZSUyMDE3fGVufDB8fDB8fHww",
    brand: "Apple",
    category: "Électronique",
    description: "Smartphone de dernière génération",
    price: 1499,
    countInStock: 17,
    rating: 4.6,
    numReviews: 100
  },
  {
    name: "SmartWatch Pro",
    slug: "smartwatch-pro",
    image: "https://plus.unsplash.com/premium_photo-1712761998611-c59db7dff27e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "FitTech",
    category: "Électronique",
    description: "Montre intelligente avec suivi de la santé",
    price: 299,
    countInStock: 34,
    rating: 4.3,
    numReviews: 87
  },
  {
    name: "Livre de cuisine",
    slug: "livre-cuisine",
    image: "https://images.unsplash.com/photo-1748017185912-c2a467989758?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "CuisinArt",
    category: "Livre",
    description: "Recettes traditionnelles et modernes",
    price: 29,
    countInStock: 50,
    rating: 4.7,
    numReviews: 120
  },
  {
    name: "Chaise de bureau",
    slug: "chaise-bureau",
    image: "https://plus.unsplash.com/premium_photo-1671656349007-0c41dab52c96?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "OfficeComfort",
    category: "Meubles",
    description: "Chaise ergonomique pour le travail",
    price: 199,
    countInStock: 20,
    rating: 4.5,
    numReviews: 60
  },
  {
    name: "Vélo de ville",
    slug: "velo-ville",
    image: "https://plus.unsplash.com/premium_photo-1677564626330-d68fabb71930?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "UrbanRide",
    category: "Vélo",
    description: "Vélo léger pour la ville",
    price: 499,
    countInStock: 15,
    rating: 4.8,
    numReviews: 75
  },
  {
    name: "Lampe de chevet",
    slug: "lampe-chevet",
    image: "https://plus.unsplash.com/premium_photo-1664194583989-96c9fa85de8f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "LightStyle",
    category: "Éclairage",
    description: "Lampe à LED avec commande tactile",
    price: 59,
    countInStock: 80,
    rating: 4.2,
    numReviews: 45
  },
  {
    name: "Sweatshirt",
    slug: "sweat-shirt",
    image: "https://images.unsplash.com/photo-1614975059251-992f11792b9f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "UrbanWear",
    category: "Vêtements",
    description: "Sweatshirt en coton biologique",
    price: 49,
    countInStock: 100,
    rating: 4.4,
    numReviews: 90
  },
  {
    name: "Chaussures Nike",
    slug: "Chaussures-Nike",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Nike",
    category: "vetement",
    description: "chaussures confortable de nike",
    price: 89,
    countInStock: 60,
    rating: 4.6,
    numReviews: 110
  },
  {
    name: "Cuisinière à induction",
    slug: "cuisiniere-induction",
    image: "https://images.unsplash.com/photo-1631677640738-65373fbd1f64?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "CookMaster",
    category: "Électroménager",
    description: "Cuisinière à induction avec 5 zones",
    price: 599,
    countInStock: 12,
    rating: 4.7,
    numReviews: 85
  },
  {
    name: "Tapis de yoga",
    slug: "tapis-yoga",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "YogaFlow",
    category: "Sport",
    description: "Tapis antidérapant avec coussin",
    price: 39,
    countInStock: 70,
    rating: 4.3,
    numReviews: 50
  },
  {
    name: "Veste en cuir",
    slug: "veste-cuir",
    image: "https://plus.unsplash.com/premium_photo-1683121231638-4100d7f6deb2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Levi's",
    category: "Vêtements",
    description: "Veste en cuir authentique pour un look classique",
    price: 249.99,
    countInStock: 5,
    rating: 4.9,
    numReviews: 140
  },
  {
    name: "Nintendo Switch OLED",
    slug: "nintendo-switch-oled",
    image: "https://images.unsplash.com/photo-1680007966627-d49ae18dbbae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Nintendo",
    category: "Jeux",
    description: "Console de jeu portable avec écran OLED",
    price: 349,
    countInStock: 18,
    rating: 4.5,
    numReviews: 90
  },
   {
    name: "Sony PlayStation 5",
    slug: "sony-ps5",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Sony",
    category: "Jeux",
    description: "Console de jeu 4K avec ray tracing",
    price: 499,
    countInStock: 14,
    rating: 4.8,
    numReviews: 150
  },
  {
    name: "Veste de sport",
    slug: "veste-sport",
    image: "https://images.unsplash.com/photo-1639895276019-65bfc8c2e8bc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Nike",
    category: "Vêtements",
    description: "Veste légère et respirante pour l'entraînement",
    price: 79.99,
    countInStock: 25,
    rating: 4.6,
    numReviews: 100
  },
  {
    name: "Robe de soirée",
    slug: "robe-soiree",
    image: "https://images.unsplash.com/photo-1583333001978-8c57d752ce5b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    brand: "Zara",
    category: "Vêtements",
    description: "Robe élégante en soie pour les soirées",
    price: 199.99,
    countInStock: 10,
    rating: 4.8,
    numReviews: 130
  },

]

  

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
]
