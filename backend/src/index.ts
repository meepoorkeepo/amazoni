import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import { productRouter } from "./routers/productRouter";
import { seedRouter } from "./routers/seedRouter";
import { userRouter } from "./routers/userRouter";
import { orderRouter } from "./routers/orderRouter";

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ''

mongoose.set('strictQuery',true)
mongoose
    .connect(MONGO_URI)
    .then(()=>{
        console.log('connected to mongoDB');
    })
    .catch(()=>{
        console.log('error in mongoDB');
        
    })

const app = express()

app.use(cors({
    credentials:true,
    origin:['http://localhost:5173']
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter)
app.use('/api/seed',seedRouter)


const PORT= 4000

app.listen(PORT,()=>{
    console.log(`listening to port at http://localhost:${PORT}`);
    
})