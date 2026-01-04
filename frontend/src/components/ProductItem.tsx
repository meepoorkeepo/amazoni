import { Button, Card } from "react-bootstrap"
import type { Product } from "../types/Product"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { useContext } from "react"
import { Store } from "../Store"
import type { CartItem } from "../types/Cart"
import { convertProductToCartItem } from "../utils"
import toast from "react-hot-toast"

function ProductItem({product}:{product:Product}) {

    const showToast = ()=>{
      toast.success('Produit ajouté au panier')
    }

    const {state, dispatch} = useContext(Store)
    const{
      cart:{cartItems},
    } = state

    const addToCartHandler = (item:CartItem) =>{
      const existItem = cartItems.find((x)=>x._id === product._id)
      const quantity = existItem ? existItem.quantity + 1:1
      if (product.countInStock<quantity) {
        toast.error('Désolé, le produit est en rupture de stock')
        return
      }
      dispatch({
        type:'CART_ADD_ITEM',
        payload:{...item,quantity},
      })
      showToast()
    }

    

  return (
    <Card>
        <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews}/>
          <Card.Text>${product.price}</Card.Text>
          {product.countInStock ===0? (
            <Button variant="light" disabled>
              En rupture de stock
            </Button>
          ) : (
            <Button onClick={()=> addToCartHandler(convertProductToCartItem(product))}>Ajouter au panier</Button>
          )}
        </Card.Body>
    </Card>
  )
}


export default ProductItem