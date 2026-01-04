import {useNavigate, useParams } from "react-router-dom";
import { useGetProductDetailsBySlugQuery } from "../hooks/ProductHooks";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../utils";
import type { ApiError } from "../types/ApiError";
import { Col, Row,ListGroup,Card, Badge, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useContext } from "react";
import { Store } from "../Store";
import toast from "react-hot-toast";

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)

  const {state,dispatch} = useContext(Store)
  const {cart} = state

  const navigate = useNavigate()
  const addToCartHandler =()=>{
    const existItem = cart.cartItems.find((x)=>x._id === product?._id)
    const quantity = existItem ? existItem.quantity+1:1
    if (product!.countInStock<quantity) {
      toast.error('Désolé, le produit est en rupture de stock');
      return
    }
    dispatch({
      type:'CART_ADD_ITEM',
      payload:{...convertProductToCartItem(product!),quantity},
    })
    toast.success('Produit ajouté au panier')
    navigate('/cart')

  }

  return isLoading? (
      <LoadingBox />)
      : error ?(
        <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
      ): !product ?(
      <MessageBox variant="danger">Produit non trouvé</MessageBox>
    ):
    (
    <div>
    <Row>
      <Col md={6}>
      <img className="large" src={product.image} alt={product.name}></img></Col>
      <Col md={3}>
      <ListGroup variant="flush">
        <ListGroup.Item>
            <h1>{product.name}</h1>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating 
          rating={product.rating}
          numReviews={product.numReviews}
          ></Rating>
        </ListGroup.Item>
        <ListGroup.Item>
          Prix : €{product.price}</ListGroup.Item>
          <ListGroup.Item>
            Description :
            <p>{product.description}</p> 
          </ListGroup.Item>
      </ListGroup>  
      </Col>
      <Col md={3}>
      <Card>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Prix</Col>
                <Col>€{product.price}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Statu:</Col>
                 <Col>
                 {product.countInStock > 0 ?(
                  <Badge bg="success">En stock</Badge>
                 ) :(
                  <Badge bg="danger">Indisponible</Badge>
                 )}
                 </Col>   
              </Row>
            </ListGroup.Item>
            {
              product.countInStock > 0 && (
                <div className="d-grid">
                  <Button onClick={addToCartHandler} variant="primary">Ajouter au panier</Button>
                </div>
              )
            }
          </ListGroup>
        </Card.Body>
      </Card>
      </Col>
    </Row>
    </div>
  )
}
