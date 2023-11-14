import { useRef } from "react";
import Header from "./Header"
import { useAuth } from "../hooks/useAuth";

function Signup() {
    const emailRef = useRef()
    const nameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup({
            emailRef,
            passwordRef,
            passwordConfirmRef,
            nameRef
        })
    }


    return (
        <>
        <Header />
        <main className="main">
            <div className="login-form">
                <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
                <form className="form form--login" onSubmit={handleSubmit}>
                    <div className="form__group">
                        <label className="form__label" htmlFor="name">Name </label>
                        <input className="form__input" ref={nameRef} id="name" type="name" placeholder="user" required="required"/>
                    </div>
                    <div className="form__group">
                        <label className="form__label" htmlFor="email">Email address</label>
                        <input className="form__input" ref={emailRef} id="email" type="email" placeholder="you@example.com" required="required"/>
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="password">Password</label>
                        <input className="form__input" ref={passwordRef} id="password" type="password" placeholder="••••••••" required="required" minLength="8"/>
                    </div>
                    <div className="form__group ma-bt-md">
                        <label className="form__label" htmlFor="passwordConfirm">Password Confirm</label>
                        <input className="form__input" ref={passwordConfirmRef} id="passwordConfirm" type="password" placeholder="••••••••" required="required" minLength="8"/>
                    </div>
                    <div className="form__group">
                        <button type='submit' className="btn btn--green">Sign Up</button>
                    </div>
                </form>
            </div>
        </main>
        </>
    )
}

export default Signup
