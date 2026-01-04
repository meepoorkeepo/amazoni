import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Store } from "../Store"
import CheckoutSteps from "../components/CheckoutSteps"
import { Button, Form } from "react-bootstrap"


export default function ShippingAdressPage() {
    const navigate = useNavigate()
    const {state,dispatch} = useContext(Store)
    const{
        userInfo,
        cart:{shippingAdress},
    }=state

    useEffect(()=>{
        if(!userInfo){
            navigate('/sigin?redirect=/shipping')
        }
    },[navigate,userInfo])

    const [fullName,setFullname] = useState(shippingAdress.fullName || '')
    
    const [adress,setAdress] = useState(shippingAdress.adress || '')

    const [city,setCity] = useState(shippingAdress.city || '')

    const [postalCode,setPostalCode] = useState(shippingAdress.postalCode || '')

    const [country,setCountry] = useState(shippingAdress.country || '')

    const submitHandler = (e:React.SyntheticEvent) =>{
        e.preventDefault()
        dispatch({
            type:'SAVESHIPPING_ADRESS',
            payload:{
                fullName,
                adress,
                city,
                country,
                postalCode
            }
        })
        localStorage.setItem(
            'shippingAdress',
            JSON.stringify({
                fullName,
                country,
                postalCode,
                adress,
                city,

            })

        )
        navigate('/payment')
    }

  return (
    <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="container small-container">
            <h1 className="my-3"> Adresse de livraison</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Nom complet</Form.Label>
                    <Form.Control 
                    value={fullName}
                    onChange={(e)=> setFullname(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="adress">
                    <Form.Label>Adress</Form.Label>
                    <Form.Control 
                    value={adress}
                    onChange={(e)=> setAdress(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="City">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control 
                    value={fullName}
                    onChange={(e)=> setCity(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="postalCode">
                    <Form.Label>Code postal</Form.Label>
                    <Form.Control 
                    value={fullName}
                    onChange={(e)=> setPostalCode(e.target.value)}
                    required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="country">
                    <Form.Label>Pays</Form.Label>
                    <Form.Control 
                    value={fullName}
                    onChange={(e)=> setCountry(e.target.value)}
                    required
                    />
                </Form.Group>

                <div className="mb-3">
                    <Button variant="primary" type="submit">
                        Continuer
                    </Button>
                </div>

            </Form>
        </div>
    </div>
  )
}
