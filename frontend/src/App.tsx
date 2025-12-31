import { useContext, useEffect } from "react"
import {Badge, Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import { Store } from "./Store"
import { ToastContainer } from "react-toastify"
import {LinkContainer} from 'react-router-bootstrap'
import 'react-toastify/dist/ReactToastify.css'



function App() {
  const {state:{mode,cart,userInfo},dispatch} = useContext(Store)

  useEffect(()=>{
    document.body.setAttribute('data-bs-theme',mode)
  },[mode])

  const switchModeHandler =()=>{
    dispatch({type:'SWITCH_MODE'})
  }

  const signoutHandler = () =>{
    dispatch({type:'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAdress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }


  return (
    <div className="d-flex flex-column">
      <ToastContainer position="top-center" limit={1}/>
      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to='/'>
            <Navbar.Brand>Amazoni</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'dark'? 'fa fa-sun': 'fa fa-moon'}></i>
            </Button>
            <Link to="/cart" className="nav-link">Cart
            {cart.cartItems.length>0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a,c)=> a+c.quantity,0)}
              </Badge>
            )}
            </Link>
            {userInfo ? (
              <NavDropdown title = {userInfo.name} id="basic-nav-dropdown">
                <Link to={"#signout"}
                      className="dropdown-item"
                      onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) :(
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>

      </main>
      <footer>
        <div className="text-center">
          All rigths reserved
        </div>
      </footer>
    </div>
  )
}

export default App
