import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { ProductModel } from '../models/productModel'
import { UserModel } from '../models/userModel'
import { sampleProducts,sampleUsers } from '../data'

export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({})
    const createdProducts = await ProductModel.insertMany(sampleProducts)
        
    await UserModel.deleteMany({})
    const createUsers = await UserModel.insertMany(sampleUsers)
    res.json({ createUsers,createdProducts })
  })
)
