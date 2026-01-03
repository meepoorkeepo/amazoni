import { useNavigate } from 'react-router-dom'
import { useGetOrderHistoryQuery } from '../hooks/orderHooks'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import type { ApiError } from '../types/ApiError'
import { Button } from 'react-bootstrap'

export default function OrderHistoryPage() {
    const navigate = useNavigate()
    const {data:orders, isPending,error} = useGetOrderHistoryQuery()
  return (
   <div>
    <h1>Order History</h1>
    {isPending ? (
        <LoadingBox></LoadingBox>

    ): error ? (
        <MessageBox variant='ganger'>{getError (error as unknown as ApiError)}</MessageBox>
    ):(
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                {orders!.map((order)=>(
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0,10) :'No'}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 'No' }</td>
                        <td>
                            <Button
                            type='button'
                            variant='light'
                            onClick={()=>{
                                navigate(`/order/${order._id}`)
                            }}
                            >
                                Details
                            </Button>
                        </td>
                    
                    </tr>
                ))}
            </tbody>
        </table>
    )}
   </div>
  )
}
