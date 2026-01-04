import React, { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import { useSignupMutation } from "../hooks/userHooks"
import { toast } from "react-toastify"
import { getError } from "../utils"
import type { ApiError } from "../types/ApiError"
import { Button, Container, Form } from "react-bootstrap"


export default function SignupPage() {
    const navigate = useNavigate()
    const {search} = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl: '/'

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const {state, dispatch} = useContext(Store)
    const {userInfo} = state
    useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
    },[navigate,userInfo,redirect])

    const {mutateAsync:signup} = useSignupMutation()

    const submitHandler = async(e:React.SyntheticEvent)=>{
      e.preventDefault()
      if(password !== confirmPassword){
        toast.error('Les mots de passe ne correspondent pas')
        return
      }
      try {
        const data = await signup({
          name,
          email,
          password,
        })
        dispatch({type:'USER_SIGNIN',payload:data})
        localStorage.setItem('userInfo',JSON.stringify(data))
        navigate(redirect || '/')
      } catch (error) {
        toast.error(getError(error as ApiError))
      }
    }
  return (
    <Container className="small-container">
      <h1 className="m-3">S'inscrire</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control onChange={(e)=>setName(e.target.value)} required/> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" onChange={(e)=>setEmail(e.target.value)} required/> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" onChange={(e)=>setPassword(e.target.value)} required/> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control type="password" onChange={(e)=>setConfirmPassword(e.target.value)} required/> 
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">S'inscrire</Button>
        </div>

        <div className="mb-3">  
          Vous avez déjà un compte ?{' '}
          <Link to={`signin?redirect=${redirect}`}>Connexion</Link>
        </div>
      </Form>

    </Container>
  )
}
