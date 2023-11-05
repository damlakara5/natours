import React, { useRef } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext'
import { toast } from 'react-toastify'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    const { setUser } = useUser();


    const handleSubmit = async(e) => {
        e.preventDefault()
        const reqData = {
            email : emailRef.current.value,
            password : passwordRef.current.value
        }
        const res = await fetch("https://natours-e3yq.onrender.com/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(reqData)
        })

        const data = await res.json()

        if(res.status === 200){
            localStorage.setItem("jwt", data.token)
            localStorage.setItem('userData', JSON.stringify(data.data.user));
            setUser(data.data.user)
            navigate("/")
       }
       if(res.status === 401){
         toast.error("Incorrect email or password")
       }
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