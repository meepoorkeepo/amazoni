import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import type { CartItem } from "../types/Cart"
import MessageBox from "../components/MessageBox"
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { toast } from "react-hot-toast"

export default function CartPage() {
    const navigate = useNavigate()

    const {
        state:{
            mode,
            cart:{cartItems},
        },
        dispatch,
    } = useContext(Store)

     const updateCartHandler = (item:CartItem,quantity:number)=>{
        if (item.countInStock<quantity) {
            toast.error('Sorry the product is out of stock')
            return
        }
        dispatch({
            type:'CART_ADD_ITEM',
            payload:{...item,quantity}
        })
     }
    const checkoutHandler = () =>{
        navigate('/signin?redirect=/shipping')
    }
    const removeItemHandler = (item:CartItem)=>{
        dispatch({type:'CART_REMOVE_ITEM',payload:item})
    }

  return (
    <div>
        <title>Panier d'achat</title>
        <h1>Panier d'achat</h1>
        <Row>
            <Col md={8}>
            {cartItems.length === 0 ? (
                <MessageBox>
                    Le panier est vide. <Link to='/'>Continuer les achats</Link>
                </MessageBox>
            ):(
                <ListGroup>
                    {cartItems.map((item:CartItem)=>(
                        <ListGroupItem key={item._id}>
                            <Row className="align-items-center">
                                <Col md={4}>
                                <img 
                                src={item.image} 
                                alt={item.name}
                                className="img-fluid rounded thumbnail"
                                ></img> <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </Col>
                                <Col md={3}>
                                <Button onClick ={()=> updateCartHandler(item,item.quantity-1)}
                                variant={mode}
                                disabled={item.quantity===1}    
                                    >
                                        <i className="fas fa-minus-circle "></i>
                                </Button>{' '}
                                <span>{item.quantity}</span>
                                <Button onClick ={()=> updateCartHandler(item,item.quantity+1)}
                                variant={mode}
                                disabled={item.quantity===item.countInStock}    
                                    >
                                        <i className="fas fa-plus-circle "></i>
                                </Button>
                                </Col>
                                <Col md={3}>${item.price}</Col>
                                <Col md={2}>
                                <Button onClick={()=>removeItemHandler(item)} variant={mode}>
                                    <i className="fas fa-trash"></i>
                                </Button>
                                </Col>
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            )}
            </Col>
            <Col md={4}>
            <Card>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>
                                sous-total({cartItems.reduce((a,c)=> a + c.quantity,0 )} {' '}articles) : €
                                {cartItems.reduce((a,c)=> a+c.price * c.quantity,0)}
                            </h3>
                        </ListGroup.Item>
                        <ListGroupItem>
                            <div className="d-grid">
                                <Button
                                type="button"
                                variant="primary"
                                onClick={checkoutHandler}
                                disabled={cartItems.length ===0}
                                >
                                    Passer à la caisse
                                </Button>
                            </div>
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </div>
  )
}
