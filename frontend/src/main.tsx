import { StrictMode } from 'react'
import{
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom"
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx';
import ProductPage from './pages/ProductPage.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StoreProvider } from './Store.tsx'
import CartPage from './pages/CartPage.tsx'
import SigningPage from './pages/SigningPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import ShippingAdressPage from './pages/ShippingAdressPage.tsx'
import PaymentMethodPage from './pages/PaymentMethodPage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import PlaceOrderPage from './pages/PlaceOrderPage.tsx'
import OrderPage from './pages/OrderPage.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderHistoryPage from './pages/OrderHistoryPage.tsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element= {<App/>}>
      <Route index={true} element= {<HomePage/>}/>
      <Route path='/product/:slug' element={<ProductPage/>} />
      <Route path='cart' element={<CartPage/>}/>
      <Route path='signin' element={<SigningPage/>}/>
      <Route path='signup' element={<SignupPage/>}/>

      <Route path='' element={<ProtectedRoute/>}>
        <Route path='shipping' element={<ShippingAdressPage/>}/>
        <Route path='payment' element={<PaymentMethodPage/>}/>
        <Route path='placeorder' element={<PlaceOrderPage/>}/>
        <Route path='/order/:id' element={<OrderPage/>}/>
        <Route path='/orderhistory' element={<OrderHistoryPage/>}/>
      </Route>
    </Route>
         
  )
)

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{'clientId':'sb'}}
      deferLoading={true}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </StrictMode>,
)
