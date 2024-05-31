import React from 'react'
import FormLogin from '../Components/Auth/FormLogin'

const LoginPage = () => {
  return (
    <>
        <h1>Welcome to our Movie Blog</h1>
        <h3 style={{textAlign: 'center', margin: '2rem'}}>To continue you have to Log in or if you do not have an account register</h3>
        <FormLogin />
    </>
  )
}

export default LoginPage