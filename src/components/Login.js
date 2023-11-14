import React, { useRef } from 'react'
import Header from './Header'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {login} = useAuth()


    const handleSubmit = async(e) => {
        e.preventDefault()
        const reqData = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }

        login(reqData)
       
    }

  return (
    <>
    <Header />
    <main className="main">
        <div className="login-form">
            <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
            <form className="form form--login" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label className="form__label" htmlFor="email">Email address</label>
                    <input className="form__input" ref={emailRef} id="email" type="email" placeholder="you@example.com" required="required"/>
                </div>
                <div className="form__group ma-bt-md">
                    <label className="form__label" htmlFor="password">Password</label>
                    <input className="form__input" ref={passwordRef} id="password" type="password" placeholder="••••••••" required="required" minLength="8"/>
                </div>
                <div className="form__group">
                    <button type='submit' className="btn btn--green">Login</button>
                </div>
            </form>
        </div>
    </main>
    </>
  )
}

export default Login