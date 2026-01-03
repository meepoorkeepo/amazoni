import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";

export default function PaymentMethodPage() {
    const navigate = useNavigate()
    const {state,dispatch} = useContext(Store)
    const {
        cart:{shippingAdress,paymentMethod},
    } = state

    const [payementMethodName,setPaymentMethodName] = useState(paymentMethod || 'PayPal')

    useEffect(()=>{
        if(!shippingAdress.adress){
            navigate('/shipping')
        }     
    },[shippingAdress,navigate])

    const submitHandler = (e:React.SyntheticEvent)=>{
        e.preventDefault()
        dispatch({type:'SAVE_PAYMENT_METHOD',payload:payementMethodName})
        localStorage.setItem('paymentMethod',payementMethodName)
        navigate('/placeorder')
    }
    return(
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <div className="container small-container">
                <h1 className="my-3">Mode de paiement</h1>
                <Form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <Form.Check
                    type="radio"
                    id="PayPal"
                    label='PayPal'
                    value='PayPal'
                    checked={payementMethodName === 'PayPal'}
                    onChange={(e)=> setPaymentMethodName(e.target.value)}
                    />
                    </div>

                    <div className="mb-3">
                   <Form.Check
                    type="radio"
                    id="Stripe"
                    label="Stripe"
                    value="Stripe"
                    checked={payementMethodName === "Stripe"}
                    onChange={(e)=> setPaymentMethodName(e.target.value)}
                    />
                    </div>

                    <div className="mb-3">
                        <Button type="submit">Continuer</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

