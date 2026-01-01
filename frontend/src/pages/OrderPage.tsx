import { Link, useParams } from "react-router-dom"
import { useGetOrderDetailsQuery } from "../hooks/orderHooks"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { getError } from "../utils"
import type { ApiError } from "../types/ApiError"
import { Card, Col, ListGroup, Row } from "react-bootstrap"


export default function OrderPage() {
    const params = useParams()
    const {id:orderId} = params

    const {
        data:order,
        isPending,
        error,
    } = useGetOrderDetailsQuery(orderId!)

  return isPending ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
  ) :!order?(
    <MessageBox variant="danger">Order not Found</MessageBox>
  ) :(
    <div>
        <h1 className="my-3">Order {orderId}</h1>
        <Row>
            <Col md={8}>
            <Card className="mb-3">
            <Card.Body>
                <Card.Title>
                    Shipping
                </Card.Title>
                <Card.Text>
                    <strong>Name:</strong>{order.shippingAdress.fullName} <br/>
                    <strong>Adress: </strong>{order.shippingAdress.adress},{order.shippingAdress.city},{order.shippingAdress.postalCode},{order.shippingAdress.country}
                </Card.Text>
                {order.isDelivered ? (
                    <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                    </MessageBox>
                ):(
                    <MessageBox variant="warning">Not Delivered</MessageBox>
                )}
            </Card.Body>
            </Card>
            
            <Card className="mb-3">
                <Card.Body>
                    <Card.Title>Payment</Card.Title>
                    <Card.Text>
                        <strong>Method:</strong>{order.paymentMethod}
                    </Card.Text>
                    {order.isPaid ? (
                        <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                    ):(
                        <MessageBox variant="warning">Not Paid</MessageBox>
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
                        Order Summary
                    </Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Order Total</Col>
                                <Col>${order.totalPrice.toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                    </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </div>
  )
}
