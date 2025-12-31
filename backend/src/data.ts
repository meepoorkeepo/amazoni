import type { Product } from './models/productModel'
import { User } from './models/userModel'
import bcrypt from 'bcryptjs'

export const sampleProducts: Product[] = [
  {
    name: 'nike T-shirt',
    slug: 'nike-t-shirt',
    image: '../images/p1.jpg',
    category: 'Tshirt',
    brand: 'Nike',
    price: 120,
    countInStock: 0,
    description: 'top quality  ',
    rating: 5,
    numReviews: 12,
  },

  {
    name: 'Adidas T-shirt',
    slug: 'Adidas-t-shirt',
    image: '../images/p2.jpg',
    category: 'Tshirt',
    brand: 'Adidas',
    price: 100,
    countInStock: 15,
    description: 'top quality',
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Lacost pants',
    slug: 'Lacost-pontalon',
    image: '../images/p3.jpg',
    category: 'pontalon',
    brand: 'Lacost',
    price: 80,
    countInStock: 0,
    description: 'top quality',
    rating: 2.6,
    numReviews: 10,
  },
  {
    name: 'Nike chaussure',
    slug: 'Nike-chaussure',
    image: '../images/p4.jpg',
    category: 'chaussure',
    brand: 'Nike',
    price: 140,
    countInStock: 10,
    description: 'top quality  ',
    rating: 4.6,
    numReviews: 16,
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
