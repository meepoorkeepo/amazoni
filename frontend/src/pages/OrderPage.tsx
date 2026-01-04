import { Link, useParams } from "react-router-dom"
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation } from "../hooks/orderHooks"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { getError } from "../utils"
import type { ApiError } from "../types/ApiError"
import { Card, Col, ListGroup, Row } from "react-bootstrap"
import { DISPATCH_ACTION, PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer, type PayPalButtonsComponentProps } from "@paypal/react-paypal-js"
import { useEffect } from "react"
import toast from "react-hot-toast"


export default function OrderPage() {
    const params = useParams()
    const {id:orderId} = params

    const {
        data:order,
        error,
        refetch,
    } = useGetOrderDetailsQuery(orderId!)

    const {mutateAsync:payOrder, isPending:loadingPay} = usePayOrderMutation()

    // const testPayHandler = async()=>{
    //     await payOrder({orderId:orderId!})
    //     refetch()
    //     toast.success('La commande est payée')
    // }

    const [{isPending},paypalDispatch] = usePayPalScriptReducer()

    const {data:paypalConfig} = useGetPaypalClientIdQuery()

    useEffect(()=>{
    if(paypalConfig && paypalConfig.clientId){
        const loadPaypalScript = async()=>{
            paypalDispatch({
                type:DISPATCH_ACTION.RESET_OPTIONS,
                value:{
                    'clientId':paypalConfig!.clientId,
                    currency:'USD'
                },
            })
            paypalDispatch({
                type:DISPATCH_ACTION.LOADING_STATUS,
                value:SCRIPT_LOADING_STATE.PENDING,
            })
        }
        loadPaypalScript()
    }
    },[paypalConfig,paypalDispatch])
    const paypalbuttonTransactionProps: PayPalButtonsComponentProps ={
        style:{layout:'vertical'},
        async createOrder(_data,actions){
            const orderID = await actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: order!.totalPrice.toString()
                        },
                    },
                ]
            })
            return orderID
        },
        async onApprove(_data,actions){
            const details = await actions.order!.capture()
            try {
                await payOrder({ orderId: orderId!, ...details })
                refetch()
                toast.success(`La commande est payée`)
            } catch (err) {
                toast.error(getError(err as ApiError))
            }
        },
        onError:(err)=>{
            toast.error(getError (err as ApiError))
        },
    }


  return isPending ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
  ) :!order?(
    <MessageBox variant="danger">Commande non trouvée</MessageBox>
  ) :(
    <div>
        <h1 className="my-3">Commande {orderId}</h1>
        <Row>
            <Col md={8}>
            <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    Expédition
                </Card.Title>
                <Card.Text>
                    <strong>Nom :</strong>{order.shippingAdress.fullName} <br/>
                    <strong>Adress: </strong>{order.shippingAdress.adress},{order.shippingAdress.city},{order.shippingAdress.postalCode},{order.shippingAdress.country}
                </Card.Text>
                {order.isDelivered ? (
                    <MessageBox variant="success">
                        Livré à {order.deliveredAt}
                    </MessageBox>
                ):(
                    <MessageBox variant="warning">Non livré</MessageBox>
                )}
            </Card.Body>
            </Card>
            
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Paiement</Card.Title>
                    <Card.Text>
                        <strong>Méthode :</strong>{order.paymentMethod}
                    </Card.Text>
                    {order.isPaid ? (
                        <MessageBox variant="success">Payé le {order.paidAt}</MessageBox>
                    ):(
                        <MessageBox variant="warning">Non payé</MessageBox>
                    )}
                </Card.Body>
            </Card>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Items</Card.Title>
                    <ListGroup variant="flush">
                        {order.orderItems.map((item)=>(
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={6}>
                                    <img
                                    src={item.image}
                                    alt={item.name}
                                    className="img-fluid rounded thumbnail"></img> {' '}
                                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>
                                        <span>{item.quantity}</span>
                                    </Col>
                                    <Col md={3}>{item.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>

            </Card>

            </Col>
            <Col md={4}>
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>
                         Récapitulatif de commande
                    </Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Articles</Col>
                                <Col>€{order.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Livraison</Col>
                                <Col>€{order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Taxe</Col>
                                <Col>€{order.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total de la commande</Col>
                                <Col>€{order.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {isPending? (
                                    <MessageBox variant="danger">Erreur lors de la connexion à PayPal</MessageBox>
                                ):(
                                    <div>
                                        <PayPalButtons
                                        {...paypalbuttonTransactionProps}
                                        ></PayPalButtons>
                                        {/* <Button onClick={testPayHandler}>test pay</Button> */}
                                    </div>
                                )}
                                {loadingPay && <LoadingBox></LoadingBox>}
                            </ListGroup.Item>
                        )}

                    </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </div>
  )
}
