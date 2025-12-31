import { Col, Row } from "react-bootstrap"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import ProductItem from "../components/ProductItem"
import { useGetProductsQuery } from "../hooks/ProductHooks"
import { getError } from "../utils"
import type { ApiError } from "../types/ApiError"




export default function HomePage() {
  const {data:products, isLoading,error} = useGetProductsQuery()
  return isLoading ? (
      <LoadingBox/>
    ):error ? (
      <MessageBox variant = "danger">{getError(error as unknown as ApiError)}</MessageBox>
    ):(
     <Row>
          {products!.map((product)=>(
            <Col key={product.slug} sm={6} md={4} lg={3}>
                <ProductItem product={product}/>
            </Col>
          ))}
    </Row>
  )
}
