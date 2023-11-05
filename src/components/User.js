import React, { useEffect,  useState } from 'react'
import { useUser } from '../context/userContext'
import { NavLink } from 'react-router-dom'
import {BsGear, BsHandbag, BsStar, BsCurrencyDollar} from "react-icons/bs"

const User = () => {
    const {user, setUser} = useUser()
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [currentPassword, setCurrentPassword] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setConfirmPassword] = useState()
    const [selectedFile, setSelectedFile] = useState(null);


    useEffect(() => {
        const handleReq = async() => {
            const res = await fetch("https://natours-e3yq.onrender.com/api/v1/users/me", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            })
    
            const data = await res.json()
        }
        handleReq()
    } , [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("name",name)
        form.append("email",email)
        form.append("photo",selectedFile)
        

        const res = await fetch("https://natours-e3yq.onrender.com/api/v1/users/updateMe", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: form
        })

        const data = await res.json()
        setUser(data.data.user)
        localStorage.setItem("userData", JSON.stringify(data.data.user))
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
        }
      };

    const handlePasswordChange = (e) => {
        e.preventDefault()
        const data = {  
            password,
            passwordConfirm,
            passwordCurrent: currentPassword
        }

        const res = fetch("https://natours-e3yq.onrender.com/api/v1/users/updateMyPassword", {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            },
            body: JSON.stringify(data)
        })

        console.log(res)
    }

    if(!user) return <p>Please log in</p>

  return (
        <main class="main py-20 md:px-16">
            <div class="user-view">
                <nav class="user-view__menu md:w-96 w-32">
                    <ul class="side-nav">
                        <li class="side-nav--active"> 
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" href="#"> <BsGear />Settings</NavLink>
                        </li>
                        <li>
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" href="/my-tours"> <BsHandbag /> My bookings</NavLink>
                        </li>
                        <li>
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" to="/myReviews"> <BsStar/> My reviews</NavLink>
                        </li>
                        <li>
                            <NavLink className="md:px-10 py-3 px-2 md:text-3xl text-sm text-start" href="#"> <BsCurrencyDollar /> Billing </NavLink>
                        </li>
                    </ul>
                    {
                        user.role === 'admin' &&
                        <div clas="admin_nav">
                            <h5 class="admin-nav__heading">Admin</h5>
                            <ul class="side-nav">
                                    <li class="side-nav--active"> 
                                    <NavLink href="#">Manage tours</NavLink>
                                </li>
                                <li>
                                    <NavLink href="/my-tours">Manage users</NavLink>
                                </li>
                                <li>
                                    <NavLink href="#">Manage reviews</NavLink>
                                </li>
                                <li>
                                    <NavLink href="#">Manage bookings</NavLink>
                                </li>
                            </ul>
                        </div>
                    }
                </nav>
                <div class="user-view__content">
                    <div class="user-view__form-container md:px-20 px-10">
                        <h2 class="heading-secondary ma-bt-md">Your account settings</h2>
                        <form class="form form-user-data"  onSubmit={handleSubmit}>
                            <div class="form__group">
                                <label class="form__label" for="name">Name</label>
                                <input class="form__input"  id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required="required" name="name" /></div>
                            <div class="form__group ma-bt-md">
                                <label class="form__label" for="email">Email address</label>
                                <input class="form__input"  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required="required" name="email" /></div>
                            <div class="form__group form__photo-upload">
                                <img class="form__user-photo" src={`https://natours-e3yq.onrender.com/img/users/${user.photo}`} alt="User" />
                                <input class="form__upload" type="file" accept="image/*" id="photo" name="photo" onChange={handleFileChange}/>
                                <label for="photo">Choose new photo</label>
                            </div>
                            <div class="form__group right">
                                <button class="btn btn--small btn--green" type='submit'>Save settings</button>
                            </div>
                        </form>
                    </div>
                    <div class="line">&nbsp;</div>
                    <div class="user-view__form-container md:px-20 px-10">
                        <h2 class="heading-secondary ma-bt-md">Password change</h2>
                        <form class="form form-user-password" onSubmit={handlePasswordChange}>
                            <div class="form__group">
                                <label class="form__label" for="password-current">Current password</label>
                                <input class="form__input" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}  id="password-current" type="password" placeholder="••••••••" required="required" minKLength="8" />
                            </div>
                            <div class="form__group">
                                <label class="form__label" for="password">New password</label>
                                <input class="form__input" value={password} onChange={(e) => setPassword(e.target.value)}  id="password" type="password" placeholder="••••••••" required="required" minLength="8" /></div>
                            <div class="form__group ma-bt-lg">
                                <label class="form__label" for="password-confirm">Confirm password</label>
                                <input class="form__input" value={passwordConfirm} onChange={(e) => setConfirmPassword(e.target.value)}  id="password-confirm" type="password" placeholder="••••••••" required="required" minLength="8" />
                            </div>
                            <div class="form__group right">
                                <button class="btn btn--small btn--green btn--save-password">Save password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
  )
}

export default User