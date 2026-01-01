import express from 'express'
export const keyRouter =  express.Router()

//request for /api/key/paypal
keyRouter.get('/paypal',(req,res)=>{
    res.json({clientId:process.env.PAYPAL_CLIENT_ID || 'sb'})
})